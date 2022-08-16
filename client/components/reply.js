



import React from 'react'

function reply() {
  return (
    <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.profile}>
            <img
              className={styles.profile_img}
              src={faker.image.avatar()}
              alt=""
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            <div className={styles.header_left}>
              <div className={styles.info}>
                <div className={styles.ud}>
                  <div className={styles.group}>
                    <div className={styles.group_left}>
                      <span className={styles.name}>{userName}</span>
                    </div>
                    <div className={styles.group_right}>
                      <MdVerified size={19} color="007aed" />
                    </div>
                  </div>
                  <div className={styles.group}>
                    <span className={styles.date}>{`3h ago`}</span>
                  </div>
                </div>
              </div>
              <div></div>
              <div></div>
            </div>
            <div className={styles.header_right}>
              <div className={styles.menu}>
                <div className={styles.menu_icon}></div>
                <div className={styles.menu_icon}></div>
                <div className={styles.menu_icon}></div>
              </div>
            </div>
          </div>

          <div className={styles.body}>
            {content && (
              <Link href={`/${userName}/post/${_id}`}>
                <a style={{ color: "black" }}>
                  <div className={styles.message}>{fillterContent()}</div>
                </a>
              </Link>
            )}

            <div className={styles.vi}>
              <div className={styles.postFilePreivew}>
                {file && file.type === "image" ? (
                  <Link href="/dev/post/123/fv ">
                    <a>
                      <img
                        className={styles.image}
                        src={`http://localhost:4000/image/${file.name}`}
                      />
                    </a>
                  </Link>
                ) : file?.type === "video" ? (
                  <video
                    controls
                    src="/testvideo.mp4"
                    className={`http://localhost:4000/video/${file.name}`}
                  ></video>
                ) : null}
              </div>
            </div>
          </div>
          <footer className={styles.c_footer}>
            <div className={styles.c_footer_group}>
              <button className={styles.button}>
                {liked ? (
                  <FcLike className={styles.icons} />
                ) : (
                  <BsHeart className={`${styles.icons} ${styles.liked}`} />
                )}

                <span>{likesCount}</span>
              </button>
            </div>

            <div className={styles.footer_group}>
              <button className={styles.button}>
                <Link href="/command">
                  <a>
                    <BsChat className={styles.c_icons} />
                  </a>
                </Link>
                <span>{commentsCount}</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
  )
}

export default reply