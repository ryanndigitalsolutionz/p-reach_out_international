import { useEffect, useRef } from 'react'

export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const elements = document.querySelectorAll('.reveal')
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export function useTiltCards() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.tilt-card')
      cards.forEach(card => {
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 400

        if (dist < maxDist) {
          const intensity = (1 - dist / maxDist) * 0.5
          const rotX = -(dy / rect.height) * 6 * intensity * (maxDist / Math.max(dist, 1))
          const rotY = (dx / rect.width) * 6 * intensity * (maxDist / Math.max(dist, 1))
          const tx = (dx / maxDist) * 5 * intensity
          const ty = (dy / maxDist) * 5 * intensity
          card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate(${tx}px, ${ty}px)`
        } else {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate(0px, 0px)'
        }
      })
    }

    const handleMouseLeave = () => {
      const cards = document.querySelectorAll('.tilt-card')
      cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate(0px, 0px)'
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
}

export function useFloatingShapes() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const shapes = document.querySelectorAll('.floating-shape')
      const mx = e.clientX / window.innerWidth
      const my = e.clientY / window.innerHeight
      shapes.forEach((shape, i) => {
        const factor = (i % 3 + 1) * 12
        const ox = (mx - 0.5) * factor
        const oy = (my - 0.5) * factor
        shape.style.transform = `translate(${ox}px, ${oy}px)`
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
}

export function useCountUp(ref, end, duration = 2000) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let start = 0
            const step = end / (duration / 16)
            const timer = setInterval(() => {
              start += step
              if (start >= end) {
                start = end
                clearInterval(timer)
              }
              if (ref.current) {
                ref.current.textContent = Math.floor(start).toLocaleString()
              }
            }, 16)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])
}
