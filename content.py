"""All site copy and settings live here.

Edit this file to change what the portfolio says. Nothing below requires
touching the HTML templates.
"""

# --- Identity ---------------------------------------------------------------

NAME = "Santiago Garcia"

# TODO: replace with a one-line description of what you build/do.
TAGLINE = "Software engineer working in Python, C++, Java, and the web."

# TODO: write 2-4 sentences about your focus, what you enjoy building, and
# what you are looking for. Keep it plain and specific.
ABOUT = (
    "TODO: Two to four sentences about yourself. What kind of problems do you "
    "like solving, what are you focused on right now, and what are you looking "
    "for next. Specific beats impressive-sounding."
)

LOCATION = "TODO: City, Country"  # TODO: or delete this line entirely

# --- Links ------------------------------------------------------------------

GITHUB_URL = "https://github.com/santiagogarcia13"
GITHUB_HANDLE = "santiagogarcia13"

EMAIL = "yagosanti13@gmail.com"

# TODO: add and delete as needed. Each entry is (label, url).
LINKS = [
    ("GitHub", GITHUB_URL),
    ("Email", f"mailto:{EMAIL}"),
]

# Set this to a Formspree endpoint to make the hosted form submit somewhere.
# Leave it empty and the form posts to the local Flask route instead.
# TODO: sign up at formspree.io, create a form for EMAIL, and paste the
# endpoint URL here, e.g. "https://formspree.io/f/abcdwxyz".
FORMSPREE_ENDPOINT = ""

# --- Skills -----------------------------------------------------------------
# TODO: edit these groups. Keep 3-6 items per group; more than that reads as
# a list of everything rather than what you actually work with.

SKILLS = [
    {
        "name": "Languages",
        "items": ["Python", "C++", "Java", "HTML", "CSS"],
    },
    {
        "name": "Focus",
        "items": [
            "TODO: algorithm and data structure work",
            "TODO: backend services",
            "TODO: systems and performance",
        ],
    },
    {
        "name": "Tools",
        "items": ["Git", "TODO: your editor", "TODO: build tools"],
    },
]

# --- Projects ---------------------------------------------------------------
# TODO: replace these with your real projects, most interesting first.
# `links` is a list of (label, url) pairs. Use [] if there are none.

PROJECTS = [
    {
        "name": "TODO: project name",
        "summary": (
            "TODO: one or two sentences on what it does and what you built. "
            "Lead with the problem, not the technology."
        ),
        "tags": ["Python"],
        "links": [("Source", GITHUB_URL)],
    },
    {
        "name": "TODO: project name",
        "summary": "TODO: what it does and your role in building it.",
        "tags": ["C++"],
        "links": [],
    },
    {
        "name": "TODO: project name",
        "summary": "TODO: what it does and your role in building it.",
        "tags": ["Java"],
        "links": [],
    },
]
