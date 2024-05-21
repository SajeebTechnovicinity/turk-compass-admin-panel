import Profile from "./profile";
import "./style.css";

export default function Header() {
    return (
        <header className='header flex-ctr-spb'>
            <div className='flex-ctr'>
                <a href='#' className='header__logo brand-logo'>
                <svg width="180" height="35" viewBox="0 0 180 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="180" height="35" fill="#D74532"/>
<path d="M29.8927 8.34662C31.8919 8.64824 33.6783 9.58908 35.0457 10.9532C36.4003 12.3079 37.3359 14.0806 37.6449 16.0596L36.0183 15.7633C35.6902 14.3282 34.961 13.0466 33.9567 12.0433C32.9407 11.0294 31.6421 10.295 30.1901 9.96901L29.8927 8.34662ZM37.6629 18.8123C37.3761 20.8432 36.4278 22.6614 35.0467 24.0457C33.6805 25.4099 31.893 26.3507 29.8938 26.6523L30.1901 25.0278C31.6421 24.704 32.9407 23.9705 33.9567 22.9556C34.9907 21.9195 35.7315 20.5945 36.0479 19.1086L37.6629 18.8123ZM27.1062 26.6523C25.107 26.3507 23.3174 25.4099 21.9532 24.0457C20.5796 22.6699 19.6334 20.8654 19.3392 18.8494L20.9584 19.1457C21.277 20.6146 22.0157 21.9301 23.0423 22.9556C24.0582 23.9695 25.3547 24.704 26.8067 25.0278L27.1062 26.6523ZM19.3593 16.0258C19.6726 14.0605 20.6071 12.3005 21.9543 10.9532C23.3185 9.58908 25.1081 8.64824 27.1073 8.34662L26.8077 9.96901C25.3557 10.295 24.0604 11.0294 23.0433 12.0433C22.0464 13.0402 21.3214 14.3092 20.9881 15.7273L19.3593 16.0258Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M33.5746 12.4222L30.0737 17.5L33.5746 22.5767L28.5 19.0727L23.4222 22.5767L26.9263 17.5L23.4222 12.4222L28.5 15.9263L33.5746 12.4222Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.9015 13.0985L28.5 17.5V16.1909L32.9015 13.0985Z" fill="#D74532"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.9015 21.9005L28.5 17.5H29.8081L32.9015 21.9005Z" fill="#D74532"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.9015 13.0985L28.5 17.5H29.8081L32.9015 13.0985Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.9015 21.9005L28.5 17.5V18.8081L32.9015 21.9005Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.0985 21.9005L28.5 17.5H27.1888L24.0985 21.9005Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.0985 13.0985L28.5 17.5V16.1909L24.0985 13.0985Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.0985 21.9005L28.5 17.5V18.8081L24.0985 21.9005Z" fill="#D74532"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.0985 13.0985L28.5 17.5H27.1888L24.0985 13.0985Z" fill="#D74532"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28.5 3L30.7468 15.2532L43 17.5L30.7468 19.7468L28.5 32L26.2511 19.7468L14 17.5L26.2511 15.2532L28.5 3Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28.5 4.92825V17.5L26.63 15.63L28.5 4.92825Z" fill="#D74532"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M41.0717 17.5H28.5L30.37 15.63L41.0717 17.5Z" fill="#D74532"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28.5 4.92825V17.5L30.37 15.63L28.5 4.92825Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M41.0717 17.5H28.5L30.37 19.369L41.0717 17.5Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28.5 30.0717V17.5L26.63 19.369L28.5 30.0717Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9283 17.5H28.5L26.63 15.63L15.9283 17.5Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28.5 30.0717V17.5L30.37 19.369L28.5 30.0717Z" fill="#D74532"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9283 17.5H28.5L26.63 19.369L15.9283 17.5Z" fill="#D74532"/>
<path d="M59.0329 17.312C59.0329 16.88 58.9729 16.524 58.8529 16.244C58.7329 15.956 58.5609 15.744 58.3369 15.608C58.1209 15.464 57.8609 15.396 57.5569 15.404H56.9809V21.032C56.9809 21.248 56.9769 21.456 56.9689 21.656C56.9609 21.856 56.9489 22.008 56.9329 22.112C57.0689 22.096 57.2409 22.088 57.4489 22.088C57.6649 22.08 57.8129 22.076 57.8929 22.076V23H54.3889V22.208C54.5729 22.2 54.7249 22.176 54.8449 22.136C54.9729 22.096 55.0689 22.004 55.1329 21.86C55.2049 21.716 55.2409 21.484 55.2409 21.164V15.416H54.6889C54.2329 15.424 53.8729 15.58 53.6089 15.884C53.3449 16.188 53.2129 16.664 53.2129 17.312H52.4209L52.4809 14.6H59.7529L59.8249 17.312H59.0329ZM65.9496 15.392C65.7736 15.4 65.6216 15.424 65.4936 15.464C65.3656 15.504 65.2656 15.596 65.1936 15.74C65.1296 15.876 65.0976 16.108 65.0976 16.436V19.736C65.0976 20.24 65.1496 20.656 65.2536 20.984C65.3656 21.304 65.5096 21.56 65.6856 21.752C65.8696 21.936 66.0736 22.068 66.2976 22.148C66.5296 22.228 66.7656 22.272 67.0056 22.28C67.4456 22.296 67.8216 22.212 68.1336 22.028C68.4456 21.844 68.6856 21.56 68.8536 21.176C69.0216 20.792 69.1056 20.304 69.1056 19.712V16.568C69.1056 16.352 69.1096 16.144 69.1176 15.944C69.1256 15.744 69.1376 15.592 69.1536 15.488C69.0256 15.496 68.8616 15.504 68.6616 15.512C68.4696 15.512 68.3296 15.516 68.2416 15.524V14.6H71.0256V15.392C70.8496 15.4 70.6976 15.424 70.5696 15.464C70.4416 15.504 70.3416 15.596 70.2696 15.74C70.2056 15.876 70.1736 16.108 70.1736 16.436V19.436C70.1736 20.124 70.0896 20.708 69.9216 21.188C69.7536 21.668 69.5176 22.056 69.2136 22.352C68.9096 22.648 68.5536 22.864 68.1456 23C67.7376 23.128 67.2936 23.192 66.8136 23.192C66.1416 23.192 65.5816 23.096 65.1336 22.904C64.6856 22.712 64.3296 22.444 64.0656 22.1C63.8096 21.756 63.6256 21.36 63.5136 20.912C63.4096 20.464 63.3576 19.984 63.3576 19.472V16.568C63.3576 16.352 63.3616 16.144 63.3696 15.944C63.3856 15.744 63.3976 15.592 63.4056 15.488C63.2776 15.496 63.1176 15.504 62.9256 15.512C62.7336 15.512 62.5936 15.516 62.5056 15.524V14.6H65.9496V15.392ZM74.0708 23V22.208C74.2548 22.2 74.4068 22.176 74.5268 22.136C74.6548 22.096 74.7508 22.004 74.8148 21.86C74.8868 21.716 74.9228 21.484 74.9228 21.164V16.568C74.9228 16.352 74.9268 16.144 74.9348 15.944C74.9508 15.744 74.9628 15.592 74.9708 15.488C74.8428 15.496 74.6828 15.504 74.4908 15.512C74.2988 15.512 74.1588 15.516 74.0708 15.524V14.6C74.6388 14.592 75.2068 14.588 75.7748 14.588C76.3428 14.588 76.9108 14.584 77.4788 14.576C78.1828 14.568 78.7948 14.648 79.3148 14.816C79.8348 14.984 80.2348 15.256 80.5148 15.632C80.7948 16.008 80.9268 16.516 80.9108 17.156C80.9028 17.492 80.8188 17.812 80.6588 18.116C80.5068 18.42 80.2748 18.688 79.9628 18.92C79.6588 19.152 79.2708 19.336 78.7988 19.472C78.9508 19.536 79.0988 19.64 79.2428 19.784C79.3948 19.928 79.5228 20.08 79.6268 20.24L80.1908 21.08C80.3668 21.352 80.5228 21.568 80.6588 21.728C80.7948 21.888 80.9308 22.008 81.0668 22.088C81.2028 22.16 81.3588 22.2 81.5348 22.208V23H79.5548C79.4108 22.896 79.2668 22.748 79.1228 22.556C78.9868 22.356 78.8388 22.128 78.6788 21.872L77.7908 20.432C77.6868 20.272 77.5948 20.136 77.5148 20.024C77.4428 19.912 77.3668 19.816 77.2868 19.736C77.1588 19.736 77.0508 19.736 76.9628 19.736C76.8748 19.736 76.7748 19.736 76.6628 19.736V21.02C76.6628 21.244 76.6588 21.456 76.6508 21.656C76.6428 21.856 76.6308 22.008 76.6148 22.112C76.7028 22.104 76.8148 22.1 76.9508 22.1C77.0868 22.092 77.2188 22.088 77.3468 22.088C77.4828 22.08 77.5788 22.076 77.6348 22.076V23H74.0708ZM77.2388 18.872C77.6868 18.872 78.0468 18.808 78.3188 18.68C78.5908 18.544 78.7868 18.344 78.9068 18.08C79.0348 17.808 79.0988 17.468 79.0988 17.06C79.0988 16.676 79.0388 16.376 78.9188 16.16C78.7988 15.936 78.6468 15.772 78.4628 15.668C78.2868 15.556 78.1068 15.488 77.9228 15.464C77.7388 15.432 77.5868 15.416 77.4668 15.416C77.2988 15.416 77.1548 15.436 77.0348 15.476C76.9148 15.516 76.8228 15.604 76.7588 15.74C76.6948 15.876 76.6628 16.084 76.6628 16.364V18.824C76.7508 18.832 76.8428 18.844 76.9388 18.86C77.0348 18.868 77.1348 18.872 77.2388 18.872ZM84.4573 23V22.208C84.6413 22.2 84.7933 22.176 84.9133 22.136C85.0413 22.096 85.1373 22.004 85.2013 21.86C85.2733 21.716 85.3093 21.484 85.3093 21.164V16.568C85.3093 16.352 85.3133 16.144 85.3213 15.944C85.3373 15.744 85.3493 15.592 85.3573 15.488C85.2293 15.496 85.0693 15.504 84.8773 15.512C84.6853 15.512 84.5453 15.516 84.4573 15.524V14.6H87.9013V15.392C87.7253 15.4 87.5733 15.424 87.4453 15.464C87.3173 15.504 87.2173 15.596 87.1453 15.74C87.0813 15.876 87.0493 16.108 87.0493 16.436V18.26H87.9133L88.8373 16.688C88.9733 16.448 89.1173 16.208 89.2693 15.968C89.4213 15.728 89.5493 15.564 89.6533 15.476C89.5253 15.484 89.3893 15.492 89.2453 15.5C89.1013 15.508 88.9853 15.516 88.8973 15.524V14.6H91.8373V15.392C91.6613 15.4 91.4693 15.432 91.2613 15.488C91.0613 15.544 90.8533 15.656 90.6373 15.824C90.4213 15.992 90.2013 16.256 89.9773 16.616L88.8253 18.464C88.9853 18.568 89.1253 18.68 89.2453 18.8C89.3733 18.912 89.4853 19.036 89.5813 19.172L90.8173 20.912C90.9773 21.136 91.1413 21.348 91.3093 21.548C91.4853 21.74 91.6653 21.896 91.8493 22.016C92.0333 22.136 92.2133 22.2 92.3893 22.208V23H90.5413C90.4773 22.992 90.3733 22.92 90.2293 22.784C90.0853 22.648 89.9333 22.484 89.7733 22.292C89.6133 22.1 89.4773 21.928 89.3653 21.776L88.1773 20.048C88.0733 19.896 87.9573 19.74 87.8293 19.58C87.7093 19.42 87.5933 19.3 87.4813 19.22H87.0493V21.032C87.0493 21.248 87.0453 21.456 87.0373 21.656C87.0293 21.856 87.0173 22.008 87.0013 22.112C87.1293 22.096 87.2893 22.088 87.4813 22.088C87.6813 22.08 87.8213 22.076 87.9013 22.076V23H84.4573ZM95.6763 17.768L95.2083 17.432C95.2963 17.32 95.3923 17.16 95.4963 16.952C95.6083 16.744 95.7043 16.516 95.7843 16.268C95.8643 16.012 95.9003 15.768 95.8923 15.536C95.8363 15.552 95.7883 15.564 95.7483 15.572C95.7163 15.572 95.6803 15.572 95.6403 15.572C95.4243 15.572 95.2323 15.508 95.0643 15.38C94.8963 15.252 94.8123 15.052 94.8123 14.78C94.8123 14.54 94.8883 14.332 95.0403 14.156C95.2003 13.972 95.4123 13.88 95.6763 13.88C96.0443 13.872 96.3203 13.992 96.5043 14.24C96.6883 14.48 96.7803 14.78 96.7803 15.14C96.7803 15.396 96.7403 15.668 96.6603 15.956C96.5803 16.244 96.4563 16.54 96.2883 16.844C96.1283 17.148 95.9243 17.456 95.6763 17.768ZM104.688 17.288C104.616 16.84 104.488 16.468 104.304 16.172C104.12 15.868 103.884 15.64 103.596 15.488C103.316 15.336 102.988 15.264 102.612 15.272C102.268 15.272 101.964 15.368 101.7 15.56C101.444 15.752 101.316 16 101.316 16.304C101.316 16.552 101.384 16.768 101.52 16.952C101.664 17.136 101.88 17.308 102.168 17.468C102.456 17.628 102.82 17.8 103.26 17.984C103.564 18.104 103.876 18.244 104.196 18.404C104.516 18.564 104.812 18.756 105.084 18.98C105.356 19.196 105.576 19.452 105.744 19.748C105.912 20.036 105.996 20.376 105.996 20.768C105.996 21.24 105.868 21.66 105.612 22.028C105.356 22.396 104.996 22.684 104.532 22.892C104.076 23.092 103.54 23.192 102.924 23.192C102.604 23.192 102.256 23.14 101.88 23.036C101.512 22.94 101.164 22.796 100.836 22.604L100.872 23.108H99.9478V20.3H100.74C100.852 20.972 101.108 21.48 101.508 21.824C101.916 22.16 102.4 22.328 102.96 22.328C103.248 22.328 103.5 22.276 103.716 22.172C103.932 22.068 104.1 21.932 104.22 21.764C104.34 21.588 104.4 21.4 104.4 21.2C104.4 20.92 104.3 20.688 104.1 20.504C103.908 20.32 103.664 20.164 103.368 20.036C103.08 19.908 102.784 19.784 102.48 19.664C102.096 19.504 101.736 19.336 101.4 19.16C101.072 18.976 100.784 18.768 100.536 18.536C100.288 18.304 100.096 18.04 99.9598 17.744C99.8238 17.44 99.7558 17.092 99.7558 16.7C99.7558 16.452 99.8038 16.196 99.8998 15.932C99.9958 15.66 100.152 15.412 100.368 15.188C100.584 14.956 100.872 14.768 101.232 14.624C101.592 14.48 102.036 14.408 102.564 14.408C102.884 14.408 103.232 14.456 103.608 14.552C103.992 14.648 104.32 14.792 104.592 14.984L104.544 14.492H105.48V17.288H104.688ZM115.364 17.288C115.26 16.624 115.036 16.124 114.692 15.788C114.356 15.452 113.908 15.28 113.348 15.272C112.932 15.272 112.568 15.368 112.256 15.56C111.944 15.752 111.684 16.008 111.476 16.328C111.276 16.648 111.124 17.012 111.02 17.42C110.924 17.828 110.876 18.248 110.876 18.68C110.876 19.368 110.972 19.98 111.164 20.516C111.364 21.044 111.652 21.46 112.028 21.764C112.404 22.068 112.86 22.22 113.396 22.22C113.9 22.22 114.4 22.092 114.896 21.836C115.392 21.572 115.808 21.208 116.144 20.744L116.72 21.272C116.328 21.808 115.916 22.216 115.484 22.496C115.052 22.768 114.628 22.952 114.212 23.048C113.804 23.144 113.436 23.192 113.108 23.192C112.492 23.192 111.932 23.084 111.428 22.868C110.924 22.644 110.488 22.34 110.12 21.956C109.76 21.564 109.48 21.112 109.28 20.6C109.088 20.08 108.992 19.52 108.992 18.92C108.992 18.376 109.08 17.836 109.256 17.3C109.432 16.764 109.692 16.28 110.036 15.848C110.388 15.408 110.828 15.06 111.356 14.804C111.884 14.54 112.496 14.408 113.192 14.408C113.504 14.408 113.844 14.46 114.212 14.564C114.588 14.66 114.94 14.804 115.268 14.996L115.22 14.492H116.144V17.288H115.364ZM121.069 23.192C120.309 23.192 119.661 23.064 119.125 22.808C118.597 22.552 118.169 22.212 117.841 21.788C117.513 21.356 117.273 20.88 117.121 20.36C116.969 19.84 116.893 19.32 116.893 18.8C116.893 18.296 116.977 17.788 117.145 17.276C117.321 16.756 117.581 16.28 117.925 15.848C118.277 15.416 118.717 15.068 119.245 14.804C119.773 14.54 120.393 14.408 121.105 14.408C121.833 14.408 122.461 14.54 122.989 14.804C123.517 15.068 123.949 15.42 124.285 15.86C124.621 16.292 124.869 16.764 125.029 17.276C125.197 17.788 125.281 18.296 125.281 18.8C125.281 19.296 125.193 19.8 125.017 20.312C124.849 20.824 124.589 21.3 124.237 21.74C123.893 22.172 123.457 22.524 122.929 22.796C122.401 23.06 121.781 23.192 121.069 23.192ZM121.201 22.316C121.617 22.316 121.965 22.216 122.245 22.016C122.525 21.808 122.749 21.54 122.917 21.212C123.085 20.884 123.205 20.528 123.277 20.144C123.349 19.752 123.385 19.372 123.385 19.004C123.385 18.452 123.337 17.948 123.241 17.492C123.145 17.036 122.997 16.644 122.797 16.316C122.597 15.98 122.341 15.724 122.029 15.548C121.725 15.364 121.365 15.276 120.949 15.284C120.541 15.292 120.197 15.404 119.917 15.62C119.637 15.828 119.413 16.1 119.245 16.436C119.077 16.764 118.957 17.124 118.885 17.516C118.813 17.908 118.777 18.288 118.777 18.656C118.777 19.032 118.817 19.432 118.897 19.856C118.985 20.28 119.121 20.68 119.305 21.056C119.489 21.432 119.737 21.736 120.049 21.968C120.361 22.2 120.745 22.316 121.201 22.316ZM130.091 23.12C129.819 22.456 129.547 21.796 129.275 21.14C129.011 20.484 128.743 19.828 128.471 19.172C128.407 19.02 128.323 18.808 128.219 18.536C128.123 18.256 128.019 17.936 127.907 17.576C127.803 17.216 127.707 16.844 127.619 16.46C127.635 16.908 127.647 17.332 127.655 17.732C127.663 18.124 127.663 18.5 127.655 18.86C127.655 19.036 127.655 19.216 127.655 19.4C127.655 19.584 127.651 19.768 127.643 19.952C127.643 20.128 127.643 20.308 127.643 20.492C127.643 20.668 127.643 20.848 127.643 21.032C127.643 21.248 127.635 21.456 127.619 21.656C127.611 21.856 127.599 22.008 127.583 22.112C127.719 22.096 127.883 22.088 128.075 22.088C128.275 22.08 128.415 22.076 128.495 22.076V23H125.759V22.208C125.943 22.2 126.095 22.176 126.215 22.136C126.343 22.096 126.439 22.004 126.503 21.86C126.575 21.716 126.611 21.484 126.611 21.164L126.683 16.568C126.691 16.352 126.699 16.144 126.707 15.944C126.715 15.744 126.723 15.592 126.731 15.488C126.603 15.496 126.443 15.504 126.251 15.512C126.059 15.512 125.919 15.516 125.831 15.524V14.6H128.483L130.295 19.244C130.367 19.428 130.447 19.644 130.535 19.892C130.623 20.132 130.707 20.368 130.787 20.6C130.867 20.824 130.927 21.004 130.967 21.14H130.979C131.083 20.86 131.179 20.588 131.267 20.324C131.355 20.06 131.447 19.804 131.543 19.556C131.855 18.724 132.163 17.896 132.467 17.072C132.779 16.248 133.091 15.424 133.403 14.6H136.175V15.392C135.999 15.4 135.843 15.424 135.707 15.464C135.571 15.504 135.467 15.596 135.395 15.74C135.331 15.876 135.303 16.108 135.311 16.436L135.491 21.032C135.507 21.248 135.507 21.456 135.491 21.656C135.475 21.856 135.459 22.008 135.443 22.112C135.579 22.096 135.743 22.088 135.935 22.088C136.135 22.08 136.275 22.076 136.355 22.076V23H133.019V22.208C133.203 22.2 133.359 22.176 133.487 22.136C133.623 22.096 133.723 22.004 133.787 21.86C133.859 21.716 133.887 21.484 133.871 21.164L133.775 18.62C133.775 18.524 133.767 18.36 133.751 18.128C133.735 17.888 133.719 17.628 133.703 17.348C133.695 17.06 133.687 16.792 133.679 16.544C133.655 16.6 133.631 16.656 133.607 16.712C133.583 16.76 133.563 16.812 133.547 16.868L131.207 23.12H130.091ZM137.096 22.208C137.28 22.2 137.432 22.176 137.552 22.136C137.68 22.096 137.776 22.004 137.84 21.86C137.912 21.716 137.948 21.484 137.948 21.164V16.568C137.948 16.352 137.952 16.144 137.96 15.944C137.976 15.744 137.988 15.592 137.996 15.488C137.868 15.496 137.708 15.504 137.516 15.512C137.324 15.512 137.184 15.516 137.096 15.524V14.6C137.664 14.592 138.232 14.588 138.8 14.588C139.368 14.588 139.936 14.584 140.504 14.576C141.208 14.568 141.82 14.66 142.34 14.852C142.868 15.044 143.272 15.34 143.552 15.74C143.84 16.14 143.976 16.66 143.96 17.3C143.952 17.62 143.876 17.936 143.732 18.248C143.588 18.552 143.376 18.832 143.096 19.088C142.816 19.336 142.464 19.54 142.04 19.7C141.616 19.86 141.12 19.948 140.552 19.964C140.376 19.972 140.22 19.976 140.084 19.976C139.956 19.976 139.824 19.972 139.688 19.964V21.02C139.688 21.244 139.684 21.456 139.676 21.656C139.668 21.856 139.656 22.008 139.64 22.112C139.728 22.104 139.84 22.1 139.976 22.1C140.112 22.092 140.244 22.088 140.372 22.088C140.508 22.08 140.604 22.076 140.66 22.076V23H137.096V22.208ZM139.688 19.064C139.776 19.072 139.864 19.08 139.952 19.088C140.04 19.096 140.132 19.1 140.228 19.1C140.668 19.1 141.024 19.028 141.296 18.884C141.576 18.732 141.78 18.516 141.908 18.236C142.036 17.948 142.1 17.6 142.1 17.192C142.1 16.792 142.044 16.472 141.932 16.232C141.828 15.992 141.692 15.816 141.524 15.704C141.356 15.584 141.18 15.508 140.996 15.476C140.812 15.436 140.644 15.416 140.492 15.416C140.324 15.416 140.18 15.436 140.06 15.476C139.94 15.516 139.848 15.604 139.784 15.74C139.72 15.876 139.688 16.084 139.688 16.364V19.064ZM143.18 23V22.172C143.404 22.172 143.584 22.108 143.72 21.98C143.856 21.852 143.968 21.684 144.056 21.476C144.152 21.268 144.244 21.044 144.332 20.804L146.672 14.384H147.512L150.068 20.924C150.116 21.044 150.18 21.228 150.26 21.476C150.34 21.716 150.388 21.928 150.404 22.112C150.54 22.096 150.668 22.088 150.788 22.088C150.916 22.08 151.02 22.076 151.1 22.076V23H147.872V22.208C148.096 22.208 148.248 22.164 148.328 22.076C148.416 21.98 148.456 21.852 148.448 21.692C148.44 21.532 148.396 21.352 148.316 21.152L148.076 20.492L145.472 20.54L145.28 21.104C145.24 21.208 145.18 21.364 145.1 21.572C145.028 21.772 144.96 21.94 144.896 22.076C145.024 22.06 145.176 22.052 145.352 22.052C145.536 22.044 145.668 22.04 145.748 22.04V23H143.18ZM145.772 19.64H147.776L147.224 18.14C147.12 17.852 147.028 17.564 146.948 17.276C146.868 16.98 146.808 16.72 146.768 16.496H146.756C146.724 16.632 146.676 16.836 146.612 17.108C146.548 17.38 146.448 17.704 146.312 18.08L145.772 19.64ZM156.235 17.288C156.163 16.84 156.035 16.468 155.851 16.172C155.667 15.868 155.431 15.64 155.143 15.488C154.863 15.336 154.535 15.264 154.159 15.272C153.815 15.272 153.511 15.368 153.247 15.56C152.991 15.752 152.863 16 152.863 16.304C152.863 16.552 152.931 16.768 153.067 16.952C153.211 17.136 153.427 17.308 153.715 17.468C154.003 17.628 154.367 17.8 154.807 17.984C155.111 18.104 155.423 18.244 155.743 18.404C156.063 18.564 156.359 18.756 156.631 18.98C156.903 19.196 157.123 19.452 157.291 19.748C157.459 20.036 157.543 20.376 157.543 20.768C157.543 21.24 157.415 21.66 157.159 22.028C156.903 22.396 156.543 22.684 156.079 22.892C155.623 23.092 155.087 23.192 154.471 23.192C154.151 23.192 153.803 23.14 153.427 23.036C153.059 22.94 152.711 22.796 152.383 22.604L152.419 23.108H151.495V20.3H152.287C152.399 20.972 152.655 21.48 153.055 21.824C153.463 22.16 153.947 22.328 154.507 22.328C154.795 22.328 155.047 22.276 155.263 22.172C155.479 22.068 155.647 21.932 155.767 21.764C155.887 21.588 155.947 21.4 155.947 21.2C155.947 20.92 155.847 20.688 155.647 20.504C155.455 20.32 155.211 20.164 154.915 20.036C154.627 19.908 154.331 19.784 154.027 19.664C153.643 19.504 153.283 19.336 152.947 19.16C152.619 18.976 152.331 18.768 152.083 18.536C151.835 18.304 151.643 18.04 151.507 17.744C151.371 17.44 151.303 17.092 151.303 16.7C151.303 16.452 151.351 16.196 151.447 15.932C151.543 15.66 151.699 15.412 151.915 15.188C152.131 14.956 152.419 14.768 152.779 14.624C153.139 14.48 153.583 14.408 154.111 14.408C154.431 14.408 154.779 14.456 155.155 14.552C155.539 14.648 155.867 14.792 156.139 14.984L156.091 14.492H157.027V17.288H156.235ZM163.047 17.288C162.975 16.84 162.847 16.468 162.663 16.172C162.479 15.868 162.243 15.64 161.955 15.488C161.675 15.336 161.347 15.264 160.971 15.272C160.627 15.272 160.323 15.368 160.059 15.56C159.803 15.752 159.675 16 159.675 16.304C159.675 16.552 159.743 16.768 159.879 16.952C160.023 17.136 160.239 17.308 160.527 17.468C160.815 17.628 161.179 17.8 161.619 17.984C161.923 18.104 162.235 18.244 162.555 18.404C162.875 18.564 163.171 18.756 163.443 18.98C163.715 19.196 163.935 19.452 164.103 19.748C164.271 20.036 164.355 20.376 164.355 20.768C164.355 21.24 164.227 21.66 163.971 22.028C163.715 22.396 163.355 22.684 162.891 22.892C162.435 23.092 161.899 23.192 161.283 23.192C160.963 23.192 160.615 23.14 160.239 23.036C159.871 22.94 159.523 22.796 159.195 22.604L159.231 23.108H158.307V20.3H159.099C159.211 20.972 159.467 21.48 159.867 21.824C160.275 22.16 160.759 22.328 161.319 22.328C161.607 22.328 161.859 22.276 162.075 22.172C162.291 22.068 162.459 21.932 162.579 21.764C162.699 21.588 162.759 21.4 162.759 21.2C162.759 20.92 162.659 20.688 162.459 20.504C162.267 20.32 162.023 20.164 161.727 20.036C161.439 19.908 161.143 19.784 160.839 19.664C160.455 19.504 160.095 19.336 159.759 19.16C159.431 18.976 159.143 18.768 158.895 18.536C158.647 18.304 158.455 18.04 158.319 17.744C158.183 17.44 158.115 17.092 158.115 16.7C158.115 16.452 158.163 16.196 158.259 15.932C158.355 15.66 158.511 15.412 158.727 15.188C158.943 14.956 159.231 14.768 159.591 14.624C159.951 14.48 160.395 14.408 160.923 14.408C161.243 14.408 161.591 14.456 161.967 14.552C162.351 14.648 162.679 14.792 162.951 14.984L162.903 14.492H163.839V17.288H163.047Z" fill="white"/>
</svg>



                </a>
            </div>
            <Profile />
        </header>
    );
}
