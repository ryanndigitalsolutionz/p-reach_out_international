# P-REACH OUT International --- Expected Community Platform

> **Purpose:** This document describes the intended fuller version of
> the P-REACH OUT International platform: the community-focused version
> the organisation may grow into after the initial release. It is a
> forward-looking product scope, not a statement that every feature is
> already available.

## 1. About P-REACH OUT International

P-REACH OUT International is a Kenya-based organisation founded in 2018.
Its motto is **"A Friend Stays There."** The organisation focuses on
counselling, mentorship, education, outreach and community support.

The platform is intended to give the organisation one accessible digital
home where visitors can learn about its work, request services,
participate in programmes, access resources, contribute to initiatives
and connect with the wider P-REACH OUT community.

## 2. Public-facing website

The public experience is expected to include:

-   **Home:** introduction to the organisation, its purpose and current
    priorities.
-   **About:** background, mission, approach and team information.
-   **Services:** counselling, mentorship, public-speaking skills,
    educational services and other available support.
-   **Programmes and missions:** activities and outreach in schools,
    prisons, communities and religious institutions.
-   **Events and participation:** upcoming activities, details and ways
    to participate.
-   **P-REACH OUT News:** organisational news, campaigns, mission
    updates, programme announcements and stories about the
    organisation's work.
-   **Resource library:** educational and support resources.
-   **Contact:** the organisation's contact channels.
-   **Donations:** a public route for supporting the organisation and
    approved initiatives.

Public information should be manageable by authorised administrators
rather than permanently embedded in frontend code.

## 3. Member accounts and personal area

Visitors should be able to create accounts and access a member
dashboard. The intended account experience includes:

-   Sign-up with personal details, including date of birth.
-   Email verification and account activation.
-   Secure sign-in and sign-out.
-   Account and session security, including visibility of relevant
    account activity.
-   A member profile with display name, biography and profile
    preferences.
-   Profile badge visibility and milestone recognition.
-   Account settings and notification preferences.
-   A dashboard bringing together relevant personal activity and
    organisation updates.

Date of birth is retained as part of registration. Age-verification
technology is deferred from the initial release; this scope does not
assume facial scanning or a third-party identity-verification service.

## 4. Counselling, appointments and service requests

The platform is expected to support requests for the organisation's
services, especially one-on-one counselling.

The intended appointment experience includes:

-   Viewing appointment availability.
-   Requesting or booking an available session.
-   Receiving confirmation or follow-up when a request needs attention.
-   Calendar integration using Google Calendar or Cal.com.
-   Online meeting details through Google Meet where applicable.

The currently described working availability for Steve is weekdays
**10:00 AM--4:00 PM** and Saturdays **2:00 PM--5:00 PM**. The actual
schedule and availability should be managed by the organisation and may
change.

Group counselling, mentorship, public-speaking skills and other services
may have their own participation or scheduling arrangements as the
organisation operationalises them.

## 5. Personal Check-In and Journal

Members are expected to have private personal tools:

-   **Check-In:** a recurring personal check-in experience with a
    summary of submitted responses and relevant history.
-   **Journal:** private journal sections and entries that members can
    create, edit and organise.

These are personal member features, not public community posts or
diagnostic services.

## 6. Community features planned for a later release

The fuller community version is expected to introduce social and group
participation features that are intentionally outside the initial V1
scope.

### 6.1 Groups and Custom Community Circles

Members should eventually be able to participate in groups or custom
community circles created for relevant interests, programmes or shared
activities. The planned direction includes group discovery and joining,
custom circles, group information, membership management, appropriate
roles and permissions, group communication, and group-related
participation and activities.

### 6.2 Group messaging

Groups are expected to have messaging so members can communicate within
their communities. The earlier feature direction included sharing
images, audio or voice notes, videos and GIFs. This means media sent
within chat, not hosted live audio/video calls.

### 6.3 Group funds

The future community experience may include group funds for suitable
group initiatives. Any such feature will need clear ownership,
visibility, permissions and financial handling before it is enabled.

### 6.4 People Hub

People Hub is intended as a wider community space where members can
publish and interact with community content. The planned direction
includes member posts, comments and replies, reactions or ratings,
sharing, and community interaction and discovery.

Appropriate moderation and community-management controls will be needed
before opening member-generated spaces.

## 7. Notifications and organisation announcements

The platform should distinguish personal notifications from
organisation-wide announcements.

### Member notifications

A general notification centre should cover relevant events such as:

-   Account and security activity, including a new login or device.
-   Acknowledgements and replies relating to member feedback or support
    conversations.
-   Relevant programme, mission or participation updates.
-   Milestones and achievements when those features are active.

Notifications should be relevant to the member and support unread/read
status.

### Application-wide announcements

The TopBar is reserved for important announcements that affect the
application or require broad member attention, such as important service
notices, application updates, errors or disruptions, responses to
widespread concerns and other significant notices.

Ordinary organisational stories and campaign updates belong in **P-REACH
OUT News**, not in application-wide alerts.

## 8. Feedback and communication with the team

Members should have a way to send feedback or raise an issue with the
organisation. The intended experience includes a feedback conversation
or message thread and an acknowledgement or response from the team.

The organisation should be able to review and respond through an
authorised administrative interface.

## 9. Donations and financial support

The platform is expected to support donations to P-REACH OUT
International and, where appropriate, approved campaigns or initiatives.

The intended direction includes clear donation information and purpose,
a secure payment process, appropriate payment confirmation and records,
and administrative visibility into donations and campaign support.

Paystack and/or Safaricom M-Pesa have been considered as payment
options. Payment processing must only be enabled when the organisation
has the required formal registration and its own appropriate
organisational payment and compliance details. The platform should not
rely on a team member's personal tax or bank details as a substitute for
the organisation's arrangements.

Group funds, if introduced, are a separate future community feature and
should not be confused with public organisational donations.

## 10. Administrative and content management

Authorised administrators should eventually be able to manage
operational content and member-facing activity, including:

-   Member accounts and relevant account issues.
-   Public website content and resources.
-   P-REACH OUT News.
-   Important application-wide announcements.
-   Programmes, missions and events.
-   Appointment requests and availability.
-   Member feedback and responses.
-   Community spaces, membership and moderation when Groups and People
    Hub are introduced.
-   Donation and campaign records when payment processing is enabled.

Administrative access should be role-based and limited to the actions
each role needs.

## 11. Help Docs and Policies

The platform should provide shared documentation accessible from the
public website and member experience.

The intended documentation areas include Getting Started; account and
data privacy information; feedback and team communication; Groups and
community guidance when Groups are introduced; Content and News
guidance; Payments and Records; and applicable organisational policies,
including privacy, terms of service, safeguarding, content and news,
payment and data-retention policies.

Documentation and policies should describe actual implemented behaviour.
They should be finalised and published as features and operational
procedures are implemented and confirmed.

## 12. Release boundaries

The fuller community platform is a long-term target. It should be
delivered in stages rather than treating every planned feature as part
of the first release.

### Initial V1 foundation

The current V1 direction prioritises:

-   Public organisation website and information.
-   Member registration, date-of-birth entry, email verification and
    account activation.
-   Secure authentication and member profiles.
-   Personal Check-In and Journal.
-   Core service information and appointment-request foundations.
-   Public resources and organisation updates as implemented.
-   Shared Help Docs and Policies structure.
-   Basic member notifications and feedback/team communication as
    implemented.
-   Administrative foundations needed to operate released features.

### Deferred community expansion

The following are intentionally deferred from V1:

-   Groups and Custom Community Circles.
-   Group messaging and media sharing.
-   Group funds.
-   People Hub and member-generated public community content.
-   Related group permissions, social interactions and moderation
    workflows.
-   Age-verification technology and any later youth-specific programme
    or forum experience.

These features may be introduced in a later release after the initial
platform is stable and the organisation has defined the necessary
operational rules.

## 13. Product principles

1.  **Community first:** make it easier for people to find support,
    learn, participate and contribute.
2.  **Privacy by design:** keep personal member tools private and expose
    community content only through intentional sharing features.
3.  **Clear separation:** distinguish organisational news, application
    announcements, personal notifications and member conversations.
4.  **Responsible operations:** enable payments, appointments and
    community capabilities only when the organisation can operate them
    properly.
5.  **Role-based administration:** give staff and administrators the
    access needed to manage the platform without making every account an
    administrator.
6.  **Incremental delivery:** build and stabilise the foundation before
    introducing the larger community ecosystem.
7.  **Documentation that matches reality:** publish guidance and
    policies that accurately describe implemented features and
    procedures.

------------------------------------------------------------------------

**Document status:** Product direction / future-scope reference.

**Important:** This document describes the intended fuller P-REACH OUT
community platform. It is not a claim that all listed features are
currently implemented, operational or approved for public use.
