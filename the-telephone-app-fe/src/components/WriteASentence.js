import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function WriteASentence() {
  return (
    <div className="container-fluid">
      <div className="col-12">
        <div
          style={{
            backgroundImage:
              'url("https://marketplace.canva.com/EAFHm4JWsu8/1/0/1600w/canva-pink-landscape-desktop-wallpaper-HGxdJA_xIx0.jpg")',
          }}
          className="card vh-100"
        >
          <div className="card-body">
            <h1
              className="text-center mt-5"
              style={{ textShadow: 'white 1px 0 5px' }}
            >
              The Telephone Game
            </h1>

            <div className="row mt-5">
              <div className="col-4"></div>
              <div className="col-4">
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-8">
                    <img
                      style={{ maxWidth: '10rem' }}
                      src="https://img.icons8.com/external-filled-agus-raharjo/512/external-phone-glyph-website-ui-filled-agus-raharjo.png"
                      alt="external-phone-glyph-website-ui-filled-agus-raharjo"
                    ></img>
                  </div>
                </div>
              </div>
              <div className="col-4"></div>
            </div>
            <div className="row mt-5">
              <h1
                className="text-center mb-5"
                style={{ textShadow: 'white 1px 0 5px' }}
              >
                WRITE A SENTENCE
              </h1>
              <div className="col-2"></div>
              <div className="col-2"></div>
              <div className="col-4">
                <input
                  style={{
                    border: 'solid 0.1rem',
                    textAlign: 'center',
                    width: '33rem',
                  }}
                  name="sentence"
                  className="form-control shadow-lg"
                  type="text"
                ></input>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-light"
                  style={{
                    minWidth: '6rem',
                    border: 'solid 0.1rem',
                  }}
                >
                  <FontAwesomeIcon icon={icon({ name: 'circle-check' })} /> Done
                </button>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
