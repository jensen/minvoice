import "./header.css";

export default function Header() {
  return (
    <div className="logo">
      <svg height="32" viewBox="0 0 320 61" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.917969 60V18H4.17188V24.3437H4.5C5.30208 22.2292 6.6875 20.5521 8.65625 19.3125C10.625 18.0729 12.9948 17.4531 15.7656 17.4531C18.8099 17.4531 21.2617 18.1823 23.1211 19.6406C24.9987 21.099 26.3477 23.0768 27.168 25.5742H27.4688C28.2891 23.1133 29.7565 21.1445 31.8711 19.668C34.0039 18.1914 36.6289 17.4531 39.7461 17.4531C43.8112 17.4531 46.9102 18.7383 49.043 21.3086C51.194 23.8607 52.2695 27.3607 52.2695 31.8086V60H48.9336V31.8086C48.9336 28.3086 48.0951 25.556 46.418 23.5508C44.7409 21.5456 42.28 20.543 39.0352 20.543C35.5716 20.543 32.9102 21.6276 31.0508 23.7969C29.1914 25.9661 28.2617 28.7279 28.2617 32.082V60H24.9258V31.5898C24.9258 28.3268 24.1055 25.6745 22.4648 23.6328C20.8242 21.5729 18.3633 20.543 15.082 20.543C12.8581 20.543 10.9349 21.0534 9.3125 22.0742C7.70833 23.0951 6.45964 24.4987 5.56641 26.2852C4.69141 28.0716 4.25391 30.1224 4.25391 32.4375V60H0.917969ZM65.5064 60V18H68.815V60H65.5064ZM67.1743 10.5625C66.4452 10.5625 65.8072 10.3073 65.2603 9.79687C64.7316 9.28646 64.4673 8.66667 64.4673 7.9375C64.4673 7.20833 64.7316 6.58854 65.2603 6.07812C65.7889 5.56771 66.4269 5.3125 67.1743 5.3125C67.9035 5.3125 68.5324 5.56771 69.0611 6.07812C69.6079 6.58854 69.8814 7.20833 69.8814 7.9375C69.8814 8.66667 69.617 9.28646 69.0884 9.79687C68.5598 10.3073 67.9217 10.5625 67.1743 10.5625ZM85.3536 32.7656V60H82.0176V18H85.2715V24.6445H85.5996C86.584 22.4753 88.1608 20.7344 90.3301 19.4219C92.4994 18.1094 95.0788 17.4531 98.0684 17.4531C100.894 17.4531 103.373 18.0547 105.506 19.2578C107.657 20.4609 109.334 22.1745 110.537 24.3984C111.759 26.6042 112.369 29.2383 112.369 32.3008V60H109.033V32.4375C109.033 28.8646 107.967 25.9935 105.834 23.8242C103.719 21.6367 100.921 20.543 97.4395 20.543C95.1062 20.543 93.028 21.0534 91.2051 22.0742C89.3822 23.0951 87.9512 24.526 86.9121 26.3672C85.8731 28.1901 85.3536 30.3229 85.3536 32.7656ZM163.525 18L149.115 60H133.802L119.419 18H133.502L141.24 46.9297H141.677L149.443 18H163.525ZM186.134 60.793C181.722 60.793 177.931 59.8906 174.759 58.0859C171.605 56.263 169.172 53.7292 167.458 50.4844C165.763 47.2214 164.915 43.4388 164.915 39.1367C164.915 34.8164 165.763 31.0339 167.458 27.7891C169.172 24.526 171.605 21.9922 174.759 20.1875C177.931 18.3646 181.722 17.4531 186.134 17.4531C190.545 17.4531 194.328 18.3646 197.482 20.1875C200.653 21.9922 203.087 24.526 204.782 27.7891C206.496 31.0339 207.353 34.8164 207.353 39.1367C207.353 43.4388 206.496 47.2214 204.782 50.4844C203.087 53.7292 200.653 56.263 197.482 58.0859C194.328 59.8906 190.545 60.793 186.134 60.793ZM186.216 50.7031C187.82 50.7031 189.178 50.2109 190.29 49.2266C191.402 48.2422 192.25 46.875 192.833 45.125C193.435 43.375 193.735 41.3516 193.735 39.0547C193.735 36.7214 193.435 34.6797 192.833 32.9297C192.25 31.1797 191.402 29.8125 190.29 28.8281C189.178 27.8437 187.82 27.3516 186.216 27.3516C184.557 27.3516 183.153 27.8437 182.005 28.8281C180.875 29.8125 180.009 31.1797 179.407 32.9297C178.824 34.6797 178.532 36.7214 178.532 39.0547C178.532 41.3516 178.824 43.375 179.407 45.125C180.009 46.875 180.875 48.2422 182.005 49.2266C183.153 50.2109 184.557 50.7031 186.216 50.7031ZM213.432 60V18H226.803V60H213.432ZM220.131 13.1055C218.254 13.1055 216.641 12.4857 215.292 11.2461C213.943 9.98828 213.268 8.47526 213.268 6.70703C213.268 4.95703 213.943 3.46224 215.292 2.22266C216.641 0.964841 218.254 0.335934 220.131 0.335934C222.027 0.335934 223.641 0.964841 224.971 2.22266C226.32 3.46224 226.995 4.95703 226.995 6.70703C226.995 8.47526 226.32 9.98828 224.971 11.2461C223.641 12.4857 222.027 13.1055 220.131 13.1055ZM254.15 60.793C249.72 60.793 245.919 59.8815 242.747 58.0586C239.594 56.2357 237.169 53.7018 235.474 50.457C233.778 47.194 232.931 43.4206 232.931 39.1367C232.931 34.8346 233.778 31.0612 235.474 27.8164C237.187 24.5534 239.621 22.0104 242.775 20.1875C245.946 18.3646 249.729 17.4531 254.122 17.4531C258.005 17.4531 261.387 18.1549 264.267 19.5586C267.165 20.9622 269.426 22.9492 271.048 25.5195C272.689 28.0716 273.554 31.0703 273.646 34.5156H261.15C260.894 32.3646 260.165 30.6784 258.962 29.457C257.777 28.2357 256.228 27.625 254.314 27.625C252.764 27.625 251.406 28.0625 250.239 28.9375C249.073 29.7943 248.161 31.0703 247.505 32.7656C246.867 34.4427 246.548 36.5208 246.548 39C246.548 41.4792 246.867 43.5755 247.505 45.2891C248.161 46.9844 249.073 48.2695 250.239 49.1445C251.406 50.0013 252.764 50.4297 254.314 50.4297C255.553 50.4297 256.647 50.1654 257.595 49.6367C258.561 49.1081 259.354 48.3333 259.974 47.3125C260.594 46.2734 260.985 45.0156 261.15 43.5391H273.646C273.518 47.0026 272.652 50.0286 271.048 52.6172C269.462 55.2057 267.229 57.2201 264.349 58.6602C261.487 60.082 258.087 60.793 254.15 60.793ZM299.351 60.793C294.958 60.793 291.166 59.9271 287.976 58.1953C284.804 56.4453 282.362 53.957 280.648 50.7305C278.953 47.4857 278.105 43.6302 278.105 39.1641C278.105 34.8255 278.962 31.0339 280.675 27.7891C282.389 24.526 284.804 21.9922 287.922 20.1875C291.039 18.3646 294.712 17.4531 298.941 17.4531C301.931 17.4531 304.665 17.918 307.144 18.8477C309.623 19.7773 311.765 21.1536 313.57 22.9766C315.375 24.7995 316.778 27.0508 317.781 29.7305C318.783 32.3919 319.285 35.4453 319.285 38.8906V42.2266H282.781V34.4609H306.843C306.825 33.0391 306.488 31.7721 305.832 30.6602C305.175 29.5482 304.273 28.6823 303.125 28.0625C301.994 27.4245 300.691 27.1055 299.214 27.1055C297.72 27.1055 296.38 27.4427 295.195 28.1172C294.01 28.7734 293.071 29.6758 292.379 30.8242C291.686 31.9544 291.321 33.2396 291.285 34.6797V42.582C291.285 44.2956 291.622 45.7995 292.297 47.0937C292.971 48.3698 293.928 49.3633 295.168 50.0742C296.407 50.7852 297.884 51.1406 299.597 51.1406C300.782 51.1406 301.858 50.9766 302.824 50.6484C303.79 50.3203 304.619 49.8372 305.312 49.1992C306.005 48.5612 306.524 47.7773 306.871 46.8477L319.148 47.2031C318.638 49.9557 317.517 52.3529 315.785 54.3945C314.071 56.418 311.82 57.9948 309.031 59.125C306.242 60.237 303.015 60.793 299.351 60.793Z" />
      </svg>
    </div>
  );
}
