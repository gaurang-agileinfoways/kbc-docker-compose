export const Footer = () => {
  return (
    <footer className="py-12 lg:mt-28 bg-gray-50 lg:px-32">
      <div className="w-full px-4 mx-auto max-w-8xl">
        <div className="grid gap-12 xl:grid-cols-6 xl:gap-24">
          <div className="col-span-2">
            <a href="not found" className="flex mb-5">
              <img
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 mr-3"
                alt="Quizbite Logo"
              />
              <span className="self-center text-2xl font-medium whitespace-nowrap">
                Quizbite
              </span>
            </a>
            <p className="max-w-lg mb-3 text-gray-600">
              Quizbite is a plateform where you can improve your knowledge and
              also study meterial provided here, <br /> Quizbite is one of the
              best plateform where you got best question and you have to answer
              of them.
            </p>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-medium text-gray-400 uppercase">
              Resources
            </h3>
            <ul>
              <li className="mb-4">
                <a
                  href="not foundnot found"
                  className="font-normal text-gray-600 hover:underline"
                >
                  Documentation
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="not foundnot foundblocks/"
                  className="font-normal text-gray-600 hover:underline"
                >
                  Quizbite Blocks
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="not foundnot foundfigma/"
                  className="font-normal text-gray-600 hover:underline"
                >
                  Figma Design
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="not foundnot foundicons/"
                  className="font-normal text-gray-600 hover:underline"
                >
                  Quizbite Icons
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-medium text-gray-400 uppercase">
              Help and support
            </h3>
            <ul>
              <li className="mb-4">
                <a
                  href="not foundnot foundcontact/"
                  rel="noreferrer nofollow"
                  className="font-normal text-gray-600 hover:underline"
                >
                  Contact us
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="not found"
                  rel="noreferrer nofollow"
                  className="font-normal text-gray-600 hover:underline"
                >
                  Github discussions
                </a>
              </li>
              <li className="mb-4 flex items-center">
                <a
                  href="not foundnot foundwork-with-us/"
                  className="font-normal text-gray-600 hover:underline"
                >
                  Work with us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-medium text-gray-400 uppercase">
              Follow us
            </h3>
            <ul>
              <li className="mb-4">
                <a
                  href="not found"
                  rel="noreferrer nofollow"
                  className="font-normal text-gray-600 hover:underline"
                >
                  Discord
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="not found"
                  className="font-normal text-gray-600 hover:underline"
                >
                  Github
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="not "
                  rel="noreferrer nofollow"
                  className="font-normal text-gray-600 hover:underline"
                >
                  Twitter/X
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="not found"
                  rel="noreferrer nofollow"
                  className="font-normal text-gray-600 hover:underline"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-medium text-gray-400 uppercase">
              Legal
            </h3>
            <ul>
              <li className="mb-4">
                <a
                  href="not foundnot foundlicense/"
                  className="font-normal text-gray-600 hover:underline"
                >
                  License (EULA)
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="not foundnot foundprivacy-policy/"
                  className="font-normal text-gray-600 hover:underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="not foundnot foundterms-and-conditions/"
                  className="font-normal text-gray-600 hover:underline"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="not foundnot foundbrand/"
                  className="font-normal text-gray-600 hover:underline"
                >
                  Brand guideline
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-gray-200 lg:my-12" />
        <span className="block text-center text-gray-600">
          © 2019-<span id="currentYear">2024</span>{" "}
          <a href="not foundnot found">Quizbite™</a> is a registered trademark.
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
