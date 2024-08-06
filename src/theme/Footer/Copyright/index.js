import React from "react";
import Github from "../../../icons/github";
import Discord from "../../../icons/discord";
import Youtube from "../../../icons/youtube";
import Twitter from "../../../icons/x";
import Linkedin from "../../../icons/linkedin";
import Mastodon from "../../../icons/mastodon";
export default function FooterCopyright({ copyright }) {
  return (
    <div
      className="footer__copyright"
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      // dangerouslySetInnerHTML={{__html: copyright}}
    >
      <div className="flex flex-row items-center space-x-4">
        <a
          href="https://github.com/hotsock"
          className="fill-black dark:fill-white hover:fill-primary dark:hover:fill-primary"
        >
          <Github className="w-8 h-8 " />
        </a>
        {/* <a
          href="/"
          className="fill-black dark:fill-white hover:fill-primary dark:hover:fill-primary"
        >
          <Discord className="w-8 h-8 " />
        </a> */}
        {/* <a
          href="/"
          className="fill-black dark:fill-white hover:fill-primary dark:hover:fill-primary"
        >
          <Youtube className="w-8 h-8 " />
        </a> */}
        <a
          href="https://x.com/gethotsock"
          className="fill-black dark:fill-white hover:fill-primary dark:hover:fill-primary"
        >
          <Twitter className="w-8 h-8  hover:!fill-current" />
        </a>
        <a
          href="https://x.com/gethotsock"
          className="fill-black dark:fill-white hover:fill-primary dark:hover:fill-primary"
        >
          <Mastodon className="w-8 h-8  hover:!fill-current" />
        </a>
        {/* <a
          href="/"
          className="fill-black dark:fill-white hover:fill-primary dark:hover:fill-primary"
        >
          <Linkedin className="w-8 h-8 " />
        </a> */}
      </div>
    </div>
  );
}
