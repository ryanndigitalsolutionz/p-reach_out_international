const achievementBadges = {
  "welcome-member": {
    name: "Welcome Member",
    image: "/assets/badges/01-welcome-member.svg",
  },
  "progress-not-perfection": {
    name: "Progress Not Perfection",
    image: "/assets/badges/02-progress-not-perfection.svg",
  },
  "beautiful-story": {
    name: "Beautiful Story",
    image: "/assets/badges/03-beautiful-story.svg",
  },
  "hi-everyone": {
    name: "Hi Everyone",
    image: "/assets/badges/04-hi-everyone.svg",
  },
  "youre-our-hero": {
    name: "You're Our Hero",
    image: "/assets/badges/05-youre-our-hero.svg",
  },
  "what-a-friend-we-have": {
    name: "What a Friend We Have",
    image: "/assets/badges/06-what-a-friend-we-have.svg",
  },
  "cherry-on-top": {
    name: "Cherry on Top",
    image: "/assets/badges/07-cherry-on-top.svg",
  },
  "i-can-definitely-help": {
    name: "I Can Definitely Help",
    image: "/assets/badges/08-i-can-definitely-help.svg",
  },
  "a-friend-indeed": {
    name: "A Friend Indeed",
    image: "/assets/badges/09-a-friend-indeed.svg",
  },
  "someones-role-model": {
    name: "Someone's Role Model",
    image: "/assets/badges/10-someones-role-model.svg",
  },
  "lets-help-together": {
    name: "Let's Help Together",
    image: "/assets/badges/11-lets-help-together.svg",
  },
  "the-more-the-merrier": {
    name: "The More the Merrier",
    image: "/assets/badges/12-the-more-the-merrier.svg",
  },
  "were-able": {
    name: "We're Able",
    image: "/assets/badges/13-were-able.svg",
  },
  "were-glad-youre-here": {
    name: "We're Glad You're Here",
    image: "/assets/badges/14-were-glad-youre-here.svg",
  },
  "eye-catching": {
    name: "Eye Catching",
    image: "/assets/badges/15-eye-catching.svg",
  },
};

const badgeSizes = {
  xs: "w-10",
  sm: "w-14",
  md: "w-20",
  lg: "w-28",
  xl: "w-36",
};

function Badge({
  badge,
  size = "md",
  showName = false,
  name,
  className = "",
}) {
  const achievement = achievementBadges[badge];

  if (!achievement) {
    return null;
  }

  const displayName = name || achievement.name;

  return (
    <figure
      className={[
        "inline-flex flex-col items-center gap-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        src={achievement.image}
        alt={displayName}
        title={displayName}
        loading="lazy"
        draggable={false}
        className={[
          "aspect-square shrink-0 object-contain",
          badgeSizes[size] || badgeSizes.md,
        ].join(" ")}
      />

      {showName && (
        <figcaption className="max-w-32 text-center text-xs font-semibold leading-5">
          {displayName}
        </figcaption>
      )}
    </figure>
  );
}

export default Badge;
