import re
import shutil
from pathlib import Path

from flask import (
    Flask,
    flash,
    redirect,
    render_template,
    request,
    url_for,
)

import content

app = Flask(__name__)

# TODO: set this before deploying anywhere public. Generate one with:
#   python -c "import secrets; print(secrets.token_hex(32))"
app.config["SECRET_KEY"] = "dev-only-change-me"

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def send_email(subject, body, reply_to):
    """Deliver a contact-form submission.

    TODO: wire up real delivery. Either use SMTP, or point the form at
    Formspree by setting content.FORMSPREE_ENDPOINT and skip this entirely.

    Until then this just logs, so the form works end to end locally.
    """
    app.logger.info("CONTACT FORM\nsubject=%s\nreply_to=%s\n%s", subject, reply_to, body)


@app.context_processor
def inject_content():
    """Make the content module available to every template as `content`."""
    return {"content": content}


@app.route("/")
def index():
    return render_template(
        "index.html",
        contact_action=content.FORMSPREE_ENDPOINT or url_for("contact"),
        static_mode=False,
    )


@app.route("/contact", methods=["POST"])
def contact():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    message = request.form.get("message", "").strip()
    honeypot = request.form.get("website", "")

    if honeypot:
        return redirect(url_for("index") + "#contact")

    errors = []
    if not name:
        errors.append("Please add your name.")
    if not EMAIL_RE.match(email):
        errors.append("Please add a valid email address.")
    if len(message) < 10:
        errors.append("Please write a slightly longer message.")
    if len(message) > 5000:
        errors.append("Please keep your message under 5000 characters.")

    if errors:
        for error in errors:
            flash(error, "error")
        return redirect(url_for("index") + "#contact")

    send_email(
        subject=f"Portfolio contact from {name}",
        body=message,
        reply_to=email,
    )
    flash("Thanks, I will get back to you soon.", "success")
    return redirect(url_for("index") + "#contact")


@app.cli.command("export-static")
def export_static():
    """Render the site to dist/ as plain HTML for static hosting.

    Serves the same template Flask uses, so both versions stay in sync.
    """
    dist = Path(app.root_path) / "dist"
    if dist.exists():
        shutil.rmtree(dist)
    dist.mkdir(parents=True)

    # The template reads flashed messages, so render inside a request context.
    with app.test_request_context():
        html = render_template(
            "index.html",
            contact_action=content.FORMSPREE_ENDPOINT,
            static_mode=True,
        )
    (dist / "index.html").write_text(html, encoding="utf-8")

    shutil.copytree(
        Path(app.static_folder),
        dist / "static",
        dirs_exist_ok=True,
    )

    print(f"Exported to {dist}")
    if not content.FORMSPREE_ENDPOINT:
        print(
            "Note: FORMSPREE_ENDPOINT is empty, so the exported form has no "
            "action and will not submit. Set it in content.py before deploying."
        )


if __name__ == "__main__":
    app.run(debug=True)
