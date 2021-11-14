import React from 'react'

import { FaLinkedin, FaGithubSquare } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <div>
        <article>
          <div className="mt-2">
            <div className="flex justify-center my-5">
              <div className="pr-8">
                <a href="https://www.linkedin.com/in/jackson-price-883424b2/">
                  <FaLinkedin style={{ color: "gray", fontSize: "45px" }} />
                </a>
              </div>
              <div>
                <a href="https://github.com/jprice8">
                  <FaGithubSquare style={{ color: "gray", fontSize: "45px" }} />
                </a>
              </div>
            </div>
            <p className="text-center font-medium text-gray-500">
              ©2021 Jackson Price
            </p>
          </div>
        </article>
      </div>
    </footer>
  )
}

export default Footer
