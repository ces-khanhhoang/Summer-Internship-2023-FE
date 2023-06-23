import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function StartGame() {
  const [data, setData] = useState({ nickname: '' })
  const onInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData({ ...data, [name]: value })
  }

  let navigate = useNavigate()

  function handleSubmit() {
    // event.preventDefault();
    const nick = data.nickname
    navigate('/lobby', { state: { data: nick } })

    alert(nick)
    // console.log(nickname);
  }

  return (
    <div className="container-fluid ">
      <form>
        <div className="row ">
          <div className="col-12">
            <div
              className="card vh-100"
              style={{
                backgroundImage:
                  'url("https://marketplace.canva.com/EAFHm4JWsu8/1/0/1600w/canva-pink-landscape-desktop-wallpaper-HGxdJA_xIx0.jpg")',
              }}
            >
              <div className="card-body">
                <h1
                  className="text-center mt-5"
                  style={{ textShadow: 'white 1px 0 5px' }}
                >
                  The Telephone Game
                </h1>
                <h3
                  style={{ textShadow: 'white 1px 0 5px' }}
                  className="text-center mt-5"
                >
                  Anonymous
                </h3>
                <div className="row mt-5">
                  <div className="col-5"></div>

                  <div className="col-2">
                    <div className="row">
                      <div className="col-2"></div>
                      <div className="col-4">
                        <img
                          style={{
                            width: '10rem',
                            border: 'solid 0.1rem',
                            borderRadius: '50%',
                          }}
                          src="https://img.freepik.com/premium-vector/cute-baby-boy-profile-picture-kid-avatar_176411-4644.jpg?w=2000"
                        ></img>
                      </div>
                      <div className="col-6"></div>
                    </div>
                    <p
                      style={{
                        textShadow: 'white 1px 0 5px',
                      }}
                      className="text-center mt-3"
                    >
                      Choose a charater and a nickname
                    </p>

                    <input
                      style={{
                        border: 'solid 0.1rem',
                        textAlign: 'center',
                      }}
                      onInput={onInput}
                      name="nickname"
                      className="form-control shadow-lg"
                      type="text"
                    ></input>
                  </div>
                  <div className="col-5"></div>
                </div>
                <div className=" row mt-2 mb-5">
                  <div className="col-5"></div>
                  <div className="col-2">
                    <button
                      type="button"
                      style={{
                        minWidth: '6rem',
                        border: 'solid 0.1rem',
                        marginLeft: '4.9rem',
                      }}
                      onClick={() => handleSubmit()}
                      className="btn btn-light mt-5 p-2"
                    >
                      <FontAwesomeIcon icon={icon({ name: 'play' })} />
                      <span
                        className="ms-2"
                        style={{
                          textShadow: 'white 1px 0 2px',
                        }}
                      >
                        Start
                      </span>
                    </button>
                  </div>
                  <div className="col-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
