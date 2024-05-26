// 뒤로가기 아이콘
interface IIcon {
  isSmall?: boolean;
  isBlue?: boolean;
}

export const ArrowBackIcon = ({ isSmall }: IIcon) => {
  return (
    <svg
      width={isSmall ? "16" : "24"}
      height={isSmall ? "16" : "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H5.25C5.05109 12.75 4.86032 12.671 4.71967 12.5303C4.57902 12.3897 4.5 12.1989 4.5 12C4.5 11.8011 4.57902 11.6103 4.71967 11.4697C4.86032 11.329 5.05109 11.25 5.25 11.25Z"
        fill="#101010"
      />
      <path
        d="M5.5605 12L11.781 18.219C11.9218 18.3598 12.0009 18.5508 12.0009 18.75C12.0009 18.9491 11.9218 19.1401 11.781 19.281C11.6402 19.4218 11.4492 19.5009 11.25 19.5009C11.0508 19.5009 10.8598 19.4218 10.719 19.281L3.969 12.531C3.89915 12.4613 3.84374 12.3785 3.80593 12.2874C3.76812 12.1963 3.74866 12.0986 3.74866 12C3.74866 11.9013 3.76812 11.8036 3.80593 11.7125C3.84374 11.6214 3.89915 11.5386 3.969 11.469L10.719 4.71897C10.8598 4.57814 11.0508 4.49902 11.25 4.49902C11.4492 4.49902 11.6402 4.57814 11.781 4.71897C11.9218 4.8598 12.0009 5.05081 12.0009 5.24997C12.0009 5.44913 11.9218 5.64014 11.781 5.78097L5.5605 12Z"
        fill="#101010"
      />
    </svg>
  );
};

// 검색 아이콘
export const SearchIcon = () => {
  return (
    <svg
      className="absolute right-2 top-1/2 -translate-y-1/2"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.625 16.625L13.1868 13.1868M13.1868 13.1868C13.775 12.5987 14.2415 11.9005 14.5598 11.1321C14.878 10.3637 15.0419 9.54007 15.0419 8.70834C15.0419 7.87662 14.8781 7.05303 14.5598 6.28462C14.2415 5.5162 13.775 4.81801 13.1868 4.22989C12.5987 3.64177 11.9005 3.17524 11.1321 2.85696C10.3637 2.53867 9.5401 2.37485 8.70837 2.37485C7.87665 2.37485 7.05307 2.53867 6.28465 2.85696C5.51624 3.17524 4.81804 3.64177 4.22992 4.22989C3.04216 5.41765 2.37488 7.0286 2.37488 8.70834C2.37488 10.3881 3.04216 11.999 4.22992 13.1868C5.41768 14.3746 7.02863 15.0418 8.70837 15.0418C10.3881 15.0418 11.9991 14.3746 13.1868 13.1868Z"
        stroke="#101010"
        strokeWidth="1.97917"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 필터 아이콘
export const FilterIcon = () => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.83331 4.5C1.7007 4.5 1.57353 4.55268 1.47976 4.64645C1.38599 4.74021 1.33331 4.86739 1.33331 5C1.33331 5.13261 1.38599 5.25979 1.47976 5.35355C1.57353 5.44732 1.7007 5.5 1.83331 5.5H14.1666C14.2993 5.5 14.4264 5.44732 14.5202 5.35355C14.614 5.25979 14.6666 5.13261 14.6666 5C14.6666 4.86739 14.614 4.74021 14.5202 4.64645C14.4264 4.55268 14.2993 4.5 14.1666 4.5H1.83331ZM3.99998 8.33333C3.99998 8.20073 4.05266 8.07355 4.14643 7.97978C4.24019 7.88601 4.36737 7.83333 4.49998 7.83333H11.5C11.6326 7.83333 11.7598 7.88601 11.8535 7.97978C11.9473 8.07355 12 8.20073 12 8.33333C12 8.46594 11.9473 8.59312 11.8535 8.68689C11.7598 8.78065 11.6326 8.83333 11.5 8.83333H4.49998C4.36737 8.83333 4.24019 8.78065 4.14643 8.68689C4.05266 8.59312 3.99998 8.46594 3.99998 8.33333ZM6.66665 11.6253C6.66665 11.4927 6.71933 11.3655 6.81309 11.2718C6.90686 11.178 7.03404 11.1253 7.16665 11.1253H8.83331C8.96592 11.1253 9.0931 11.178 9.18687 11.2718C9.28063 11.3655 9.33331 11.4927 9.33331 11.6253C9.33331 11.7579 9.28063 11.8851 9.18687 11.9789C9.0931 12.0727 8.96592 12.1253 8.83331 12.1253H7.16665C7.03404 12.1253 6.90686 12.0727 6.81309 11.9789C6.71933 11.8851 6.66665 11.7579 6.66665 11.6253Z"
        fill="#101010"
      />
    </svg>
  );
};

// 아래 화살표 아이콘
export const ArrowDownIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 14.702L6.69202 9.39401L7.40002 8.68701L12 13.287L16.6 8.68701L17.308 9.39401L12 14.702Z"
        fill="#101010"
      />
    </svg>
  );
};

// 신고 아이콘
export const ReportIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 11.6667H4V7C4 4.791 5.791 3 8 3C10.209 3 12 4.791 12 7V11.6667Z"
        stroke="#D52828"
        strokeWidth="1.33333"
        strokeLinejoin="round"
      />
      <path
        d="M2.66665 14H13.3333M1.33331 4.33337L2.33331 4.66671M4.33331 1.33337L4.66665 2.33337M3.33331 3.33337L2.33331 2.33337"
        stroke="#D52828"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface PathProps {
  active?: boolean;
}

// 둘러보기 아이콘
export const BrowseIcon = ({ active }: PathProps) => {
  const strokeColor = active ? "#6E7CF2" : "#101010";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M24.6666 24.6667L28 28M5.33331 8H26.6666M5.33331 16H10.6666M5.33331 24H10.6666M14.6666 20C14.6666 21.4145 15.2285 22.771 16.2287 23.7712C17.2289 24.7714 18.5855 25.3333 20 25.3333C21.4145 25.3333 22.771 24.7714 23.7712 23.7712C24.7714 22.771 25.3333 21.4145 25.3333 20C25.3333 18.5855 24.7714 17.229 23.7712 16.2288C22.771 15.2286 21.4145 14.6667 20 14.6667C18.5855 14.6667 17.2289 15.2286 16.2287 16.2288C15.2285 17.229 14.6666 18.5855 14.6666 20Z"
        stroke={strokeColor}
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 내 설문 아이콘
export const MySurveyIcon = ({ active }: PathProps) => {
  const strokeColor = active ? "#6E7CF2" : "#101010";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M14.6667 20H22.6667V22.6667H14.6667V20ZM12 9.33333H9.33333V12H12V9.33333ZM14.6667 17.3333H22.6667V14.6667H14.6667V17.3333ZM14.6667 12H22.6667V9.33333H14.6667V12ZM12 14.6667H9.33333V17.3333H12V14.6667ZM28 6.66667V25.3333C28 26.8 26.8 28 25.3333 28H6.66667C5.2 28 4 26.8 4 25.3333V6.66667C4 5.2 5.2 4 6.66667 4H25.3333C26.8 4 28 5.2 28 6.66667ZM25.3333 6.66667H6.66667V25.3333H25.3333V6.66667ZM12 20H9.33333V22.6667H12V20Z"
        fill={strokeColor}
      />
    </svg>
  );
};

// 포인트 교환 아이콘
export const PointIcon = ({ active }: PathProps) => {
  const strokeColor = active ? "#6E7CF2" : "#101010";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M4 16C4 17.5759 4.31039 19.1363 4.91345 20.5922C5.5165 22.0481 6.40042 23.371 7.51472 24.4853C8.62902 25.5996 9.95189 26.4835 11.4078 27.0866C12.8637 27.6896 14.4241 28 16 28C17.5759 28 19.1363 27.6896 20.5922 27.0866C22.0481 26.4835 23.371 25.5996 24.4853 24.4853C25.5996 23.371 26.4835 22.0481 27.0866 20.5922C27.6896 19.1363 28 17.5759 28 16C28 14.4241 27.6896 12.8637 27.0866 11.4078C26.4835 9.95189 25.5996 8.62902 24.4853 7.51472C23.371 6.40042 22.0481 5.5165 20.5922 4.91345C19.1363 4.31039 17.5759 4 16 4C14.4241 4 12.8637 4.31039 11.4078 4.91345C9.95189 5.5165 8.62902 6.40042 7.51472 7.51472C6.40042 8.62902 5.5165 9.95189 4.91345 11.4078C4.31039 12.8637 4 14.4241 4 16Z"
        stroke={strokeColor}
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.7333 12C19.4918 11.5811 19.1409 11.2356 18.7181 11.0008C18.2954 10.7659 17.8167 10.6504 17.3333 10.6667H14.6667C13.9594 10.6667 13.2811 10.9477 12.781 11.4478C12.281 11.9479 12 12.6261 12 13.3334C12 14.0406 12.281 14.7189 12.781 15.219C13.2811 15.7191 13.9594 16 14.6667 16H17.3333C18.0406 16 18.7189 16.281 19.219 16.7811C19.719 17.2812 20 17.9595 20 18.6667C20 19.374 19.719 20.0522 19.219 20.5523C18.7189 21.0524 18.0406 21.3334 17.3333 21.3334H14.6667C14.1833 21.3496 13.7046 21.2342 13.2819 20.9993C12.8591 20.7644 12.5082 20.419 12.2667 20M16 9.33337V22.6667"
        stroke={strokeColor}
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 프로필 아이콘
export const ProfileIcon = ({ active }: PathProps) => {
  const strokeColor = active ? "#6E7CF2" : "#101010";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M5.33337 24.0001C5.33337 22.5856 5.89528 21.229 6.89547 20.2288C7.89567 19.2287 9.25222 18.6667 10.6667 18.6667H21.3334C22.7479 18.6667 24.1044 19.2287 25.1046 20.2288C26.1048 21.229 26.6667 22.5856 26.6667 24.0001C26.6667 24.7073 26.3858 25.3856 25.8857 25.8857C25.3856 26.3858 24.7073 26.6667 24 26.6667H8.00004C7.2928 26.6667 6.61452 26.3858 6.11442 25.8857C5.61433 25.3856 5.33337 24.7073 5.33337 24.0001Z"
        stroke={strokeColor}
        strokeWidth="2.66667"
        strokeLinejoin="round"
      />
      <path
        d="M16 13.3334C18.2091 13.3334 20 11.5425 20 9.33337C20 7.12424 18.2091 5.33337 16 5.33337C13.7909 5.33337 12 7.12424 12 9.33337C12 11.5425 13.7909 13.3334 16 13.3334Z"
        stroke={strokeColor}
        strokeWidth="2.66667"
      />
    </svg>
  );
};

// 톱니바퀴 아이콘
export const SettingIcon = ({ isSmall }: IIcon) => {
  return (
    <svg
      width={isSmall ? "16" : "24"}
      height={isSmall ? "16" : "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.2948 9.01453C11.6793 8.95374 11.06 9.08469 10.5218 9.38945C9.98359 9.69421 9.55272 10.1579 9.28819 10.717C9.02367 11.2761 8.93842 11.9033 9.04412 12.5127C9.14982 13.1221 9.44131 13.684 9.87867 14.1213C10.316 14.5587 10.8779 14.8502 11.4873 14.9559C12.0967 15.0616 12.7239 14.9763 13.283 14.7118C13.8421 14.4473 14.3058 14.0164 14.6105 13.4782C14.9153 12.94 15.0463 12.3207 14.9855 11.7052C14.9162 11.0151 14.6104 10.3703 14.12 9.87995C13.6297 9.38958 12.9849 9.08384 12.2948 9.01453ZM19.5183 12C19.5164 12.3261 19.4924 12.6517 19.4466 12.9745L21.5658 14.6367C21.6581 14.7132 21.7202 14.8199 21.7413 14.9379C21.7623 15.056 21.7408 15.1776 21.6806 15.2812L19.6758 18.75C19.6149 18.8527 19.5197 18.9305 19.407 18.9699C19.2944 19.0093 19.1714 19.0076 19.0598 18.9652L16.9552 18.1177C16.8391 18.0714 16.7134 18.0547 16.5893 18.0691C16.4652 18.0834 16.3466 18.1283 16.2441 18.1997C15.9228 18.4209 15.5853 18.6174 15.2344 18.7875C15.124 18.8411 15.0286 18.9211 14.9565 19.0203C14.8844 19.1196 14.8378 19.2351 14.8209 19.3566L14.5055 21.6014C14.4847 21.72 14.4235 21.8276 14.3322 21.906C14.2409 21.9844 14.1252 22.0287 14.0048 22.0312H9.99515C9.87681 22.0292 9.7627 21.9869 9.67161 21.9113C9.58053 21.8357 9.5179 21.7314 9.49406 21.6155L9.17906 19.3739C9.16137 19.2511 9.1136 19.1345 9.04 19.0346C8.9664 18.9346 8.86925 18.8544 8.75718 18.8011C8.40666 18.6319 8.07027 18.4349 7.75125 18.2119C7.6491 18.1408 7.53088 18.0963 7.40724 18.0823C7.28359 18.0683 7.15841 18.0853 7.04296 18.1317L4.93875 18.9788C4.82723 19.0212 4.70431 19.023 4.59164 18.9837C4.47896 18.9444 4.38376 18.8666 4.32281 18.7641L2.31796 15.2953C2.25769 15.1917 2.23615 15.07 2.25718 14.952C2.27821 14.834 2.34045 14.7272 2.43281 14.6508L4.2239 13.2445C4.32203 13.1666 4.39915 13.0655 4.44826 12.9502C4.49738 12.835 4.51693 12.7093 4.50515 12.5845C4.48828 12.3891 4.47796 12.1941 4.47796 11.9986C4.47796 11.8031 4.48781 11.6109 4.50515 11.4197C4.51564 11.2957 4.49513 11.1711 4.44546 11.057C4.39579 10.9429 4.31852 10.843 4.22062 10.7662L2.43046 9.36C2.3396 9.28317 2.27868 9.17681 2.25836 9.05957C2.23805 8.94232 2.25965 8.82167 2.31937 8.71875L4.32421 5.25C4.3851 5.14734 4.48027 5.06946 4.59295 5.0301C4.70563 4.99074 4.82859 4.99242 4.94015 5.03484L7.04484 5.88234C7.1609 5.92856 7.28662 5.94525 7.41072 5.93094C7.53483 5.91662 7.65344 5.87174 7.75593 5.80031C8.07714 5.57912 8.41468 5.38262 8.76562 5.2125C8.87595 5.15887 8.97138 5.07891 9.04349 4.97966C9.11559 4.88042 9.16215 4.76494 9.17906 4.64344L9.49453 2.39859C9.51525 2.28004 9.5765 2.17236 9.66781 2.09396C9.75912 2.01555 9.87483 1.9713 9.99515 1.96875H14.0048C14.1232 1.9708 14.2373 2.01309 14.3284 2.08867C14.4195 2.16425 14.4821 2.2686 14.5059 2.38453L14.8209 4.62609C14.8386 4.74894 14.8864 4.86551 14.96 4.96544C15.0336 5.06537 15.1307 5.14557 15.2428 5.19891C15.5933 5.3681 15.9297 5.56514 16.2487 5.78813C16.3509 5.85919 16.4691 5.90373 16.5928 5.91772C16.7164 5.93172 16.8416 5.91473 16.957 5.86828L19.0612 5.02125C19.1728 4.97879 19.2957 4.97704 19.4084 5.01631C19.521 5.05558 19.6162 5.13336 19.6772 5.23594L21.682 8.70469C21.7423 8.80832 21.7638 8.92999 21.7428 9.04802C21.7218 9.16604 21.6595 9.27278 21.5672 9.34922L19.7761 10.7555C19.6775 10.8331 19.6 10.9342 19.5504 11.0494C19.5009 11.1647 19.481 11.2905 19.4925 11.4155C19.508 11.6095 19.5183 11.8045 19.5183 12Z"
        stroke="#101010"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 새 설문 만들기 아이콘
export const AddSurveyIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.33337 8.00004C1.33337 4.31804 4.31804 1.33337 8.00004 1.33337C11.682 1.33337 14.6667 4.31804 14.6667 8.00004C14.6667 11.682 11.682 14.6667 8.00004 14.6667C4.31804 14.6667 1.33337 11.682 1.33337 8.00004ZM8.00004 2.66671C6.58555 2.66671 5.229 3.22861 4.2288 4.2288C3.22861 5.229 2.66671 6.58555 2.66671 8.00004C2.66671 9.41453 3.22861 10.7711 4.2288 11.7713C5.229 12.7715 6.58555 13.3334 8.00004 13.3334C9.41453 13.3334 10.7711 12.7715 11.7713 11.7713C12.7715 10.7711 13.3334 9.41453 13.3334 8.00004C13.3334 6.58555 12.7715 5.229 11.7713 4.2288C10.7711 3.22861 9.41453 2.66671 8.00004 2.66671Z"
        fill="#101010"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.66667 4.66667C8.66667 4.48986 8.59643 4.32029 8.4714 4.19526C8.34638 4.07024 8.17681 4 8 4C7.82319 4 7.65362 4.07024 7.5286 4.19526C7.40357 4.32029 7.33333 4.48986 7.33333 4.66667V7.33333H4.66667C4.48986 7.33333 4.32029 7.40357 4.19526 7.5286C4.07024 7.65362 4 7.82319 4 8C4 8.17681 4.07024 8.34638 4.19526 8.4714C4.32029 8.59643 4.48986 8.66667 4.66667 8.66667H7.33333V11.3333C7.33333 11.5101 7.40357 11.6797 7.5286 11.8047C7.65362 11.9298 7.82319 12 8 12C8.17681 12 8.34638 11.9298 8.4714 11.8047C8.59643 11.6797 8.66667 11.5101 8.66667 11.3333V8.66667H11.3333C11.5101 8.66667 11.6797 8.59643 11.8047 8.4714C11.9298 8.34638 12 8.17681 12 8C12 7.82319 11.9298 7.65362 11.8047 7.5286C11.6797 7.40357 11.5101 7.33333 11.3333 7.33333H8.66667V4.66667Z"
        fill="#101010"
      />
    </svg>
  );
};

// 수정 아이콘
export const UpdateIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.3 4.80003L17.2 7.70003M7 7.00003H4C3.73478 7.00003 3.48043 7.10539 3.29289 7.29293C3.10536 7.48046 3 7.73482 3 8.00003V18C3 18.6 3.4 19 4 19H15C15.6 19 16 18.6 16 18V13.5M18.4 3.50003C18.6128 3.68772 18.7833 3.91854 18.9 4.17716C19.0167 4.43578 19.0771 4.71628 19.0771 5.00003C19.0771 5.28379 19.0167 5.56429 18.9 5.82291C18.7833 6.08153 18.6128 6.31235 18.4 6.50003L11.6 13.3L8 14L8.7 10.4L15.6 3.60003C15.9739 3.23358 16.4765 3.02832 17 3.02832C17.5235 3.02832 18.0261 3.23358 18.4 3.60003V3.50003Z"
        stroke="#6E7CF2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 아래 세모 아이콘
export const TriangleDownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 17"
      fill="none"
    >
      <path d="M5.33325 6.5H10.6666L7.99992 11.1667" fill="#101010" />
    </svg>
  );
};

// 양쪽 화살표 아이콘
export const TwoWayArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M5.01997 4.35356C5.10829 4.25877 5.15637 4.13341 5.15408 4.00387C5.1518 3.87434 5.09932 3.75075 5.00771 3.65914C4.91611 3.56753 4.79252 3.51506 4.66298 3.51277C4.53345 3.51049 4.40808 3.55857 4.3133 3.64689L2.97997 4.98022C2.88633 5.07397 2.83374 5.20106 2.83374 5.33356C2.83374 5.46606 2.88633 5.59314 2.97997 5.68689L4.3133 7.02022C4.35907 7.06935 4.41428 7.10875 4.47561 7.13608C4.53694 7.16341 4.60315 7.1781 4.67029 7.17928C4.73742 7.18047 4.80411 7.16812 4.86637 7.14297C4.92862 7.11782 4.98518 7.08039 5.03266 7.03292C5.08014 6.98544 5.11757 6.92888 5.14272 6.86662C5.16786 6.80436 5.18021 6.73768 5.17903 6.67054C5.17784 6.60341 5.16315 6.5372 5.13582 6.47586C5.10849 6.41453 5.06909 6.35933 5.01997 6.31356L4.53997 5.83356H11.3333C11.4659 5.83356 11.5931 5.78088 11.6869 5.68711C11.7806 5.59334 11.8333 5.46616 11.8333 5.33356C11.8333 5.20095 11.7806 5.07377 11.6869 4.98C11.5931 4.88623 11.4659 4.83356 11.3333 4.83356H4.53997L5.01997 4.35356ZM10.98 8.98022C10.8863 9.07397 10.8337 9.20106 10.8337 9.33356C10.8337 9.46606 10.8863 9.59314 10.98 9.68689L11.46 10.1669H4.66663C4.53403 10.1669 4.40685 10.2196 4.31308 10.3133C4.21931 10.4071 4.16663 10.5343 4.16663 10.6669C4.16663 10.7995 4.21931 10.9267 4.31308 11.0204C4.40685 11.1142 4.53403 11.1669 4.66663 11.1669H11.46L10.98 11.6469C10.9308 11.6927 10.8914 11.7479 10.8641 11.8092C10.8368 11.8705 10.8221 11.9367 10.8209 12.0039C10.8197 12.071 10.8321 12.1377 10.8572 12.2C10.8824 12.2622 10.9198 12.3188 10.9673 12.3662C11.0148 12.4137 11.0713 12.4512 11.1336 12.4763C11.1958 12.5015 11.2625 12.5138 11.3296 12.5126C11.3968 12.5114 11.463 12.4967 11.5243 12.4694C11.5857 12.4421 11.6409 12.4027 11.6866 12.3536L13.02 11.0202C13.1136 10.9265 13.1662 10.7994 13.1662 10.6669C13.1662 10.5344 13.1136 10.4073 13.02 10.3136L11.6866 8.98022C11.5929 8.88659 11.4658 8.834 11.3333 8.834C11.2008 8.834 11.0737 8.88659 10.98 8.98022Z"
        fill="#5BC552"
      />
    </svg>
  );
};

// 마이너스 아이콘
export const MinusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M14.25 8C14.25 8.19891 14.171 8.38968 14.0303 8.53033C13.8897 8.67098 13.6989 8.75 13.5 8.75H2.5C2.30109 8.75 2.11032 8.67098 1.96967 8.53033C1.82902 8.38968 1.75 8.19891 1.75 8C1.75 7.80109 1.82902 7.61032 1.96967 7.46967C2.11032 7.32902 2.30109 7.25 2.5 7.25H13.5C13.6989 7.25 13.8897 7.32902 14.0303 7.46967C14.171 7.61032 14.25 7.80109 14.25 8Z"
        fill="#D52828"
      />
    </svg>
  );
};

// 플러스 아이콘
export const PlusIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 1 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.25 8C14.25 8.19891 14.171 8.38968 14.0303 8.53033C13.8897 8.67098 13.6989 8.75 13.5 8.75H8.75V13.5C8.75 13.6989 8.67098 13.8897 8.53033 14.0303C8.38968 14.171 8.19891 14.25 8 14.25C7.80109 14.25 7.61032 14.171 7.46967 14.0303C7.32902 13.8897 7.25 13.6989 7.25 13.5V8.75H2.5C2.30109 8.75 2.11032 8.67098 1.96967 8.53033C1.82902 8.38968 1.75 8.19891 1.75 8C1.75 7.80109 1.82902 7.61032 1.96967 7.46967C2.11032 7.32902 2.30109 7.25 2.5 7.25H7.25V2.5C7.25 2.30109 7.32902 2.11032 7.46967 1.96967C7.61032 1.82902 7.80109 1.75 8 1.75C8.19891 1.75 8.38968 1.82902 8.53033 1.96967C8.67098 2.11032 8.75 2.30109 8.75 2.5V7.25H13.5C13.6989 7.25 13.8897 7.32902 14.0303 7.46967C14.171 7.61032 14.25 7.80109 14.25 8Z"
        fill="#6E7CF2"
      />
    </svg>
  );
};

// 체크 아이콘
export const CheckIcon = () => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 7.5L10 17.5L5 12.5"
        stroke="#101010"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 작은 체크 아이콘
export const SmallCheckIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.97 4.97C11.1108 4.83589 11.2983 4.76175 11.4928 4.76322C11.6873 4.76469 11.8736 4.84166 12.0124 4.97789C12.1512 5.11412 12.2317 5.29895 12.2369 5.49338C12.242 5.68781 12.1714 5.87663 12.04 6.02L8.04997 11.01C7.98137 11.0839 7.89856 11.1432 7.80651 11.1844C7.71445 11.2255 7.61505 11.2477 7.51423 11.2496C7.41341 11.2514 7.31324 11.233 7.21973 11.1952C7.12622 11.1575 7.04127 11.1013 6.96997 11.03L4.32397 8.384C4.25029 8.31534 4.19119 8.23254 4.15019 8.14054C4.1092 8.04854 4.08716 7.94923 4.08538 7.84852C4.08361 7.74782 4.10213 7.64779 4.13985 7.5544C4.17757 7.46102 4.23372 7.37618 4.30494 7.30496C4.37616 7.23374 4.46099 7.1776 4.55438 7.13988C4.64777 7.10216 4.74779 7.08363 4.8485 7.08541C4.9492 7.08719 5.04851 7.10923 5.14051 7.15022C5.23251 7.19121 5.31531 7.25031 5.38397 7.324L7.47797 9.417L10.951 4.992L10.97 4.97Z"
        fill="white"
      />
    </svg>
  );
};

interface OrderIconProps {
  isActive: boolean;
}

// 위 향한 네모세모 순서 화살표 아이콘
export const OrderUpIcon: React.FC<OrderIconProps> = ({ isActive }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isActive ? "#6E7CF2" : "#9E9E9E"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_345_5182)">
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="3.5"
          fill="white"
          stroke={isActive ? "#6E7CF2" : "#9E9E9E"}
        />
        <path
          d="M11.134 8.5C11.5189 7.83333 12.4811 7.83333 12.866 8.5L16.3301 14.5C16.715 15.1667 16.2339 16 15.4641 16H8.5359C7.7661 16 7.28497 15.1667 7.66987 14.5L11.134 8.5Z"
          stroke={isActive ? "#6E7CF2" : "#9E9E9E"}
        />
      </g>
      <defs>
        <clipPath id="clip0_345_5182">
          <rect width="24" height="24" fill="#9E9E9E" />
        </clipPath>
      </defs>
    </svg>
  );
};

// 아래 향한 네모세모 순서 화살표 아이콘
export const OrderDownIcon: React.FC<OrderIconProps> = ({ isActive }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isActive ? "#6E7CF2" : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_345_5199)">
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="3.5"
          fill="white"
          stroke={isActive ? "#6E7CF2" : "#9E9E9E"}
        />
        <path
          d="M12.866 15.5C12.4811 16.1667 11.5189 16.1667 11.134 15.5L7.66987 9.5C7.28497 8.83333 7.7661 8 8.5359 8L15.4641 8C16.2339 8 16.715 8.83333 16.3301 9.5L12.866 15.5Z"
          fill={isActive ? "#6E7CF2" : "#9E9E9E"}
        />
      </g>
      <defs>
        <clipPath id="clip0_345_5199">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

// (새 설문) 새 질문 동그라미플러스 아이콘
export const AddQuestionIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.66675 15.9998C2.66675 8.63584 8.63608 2.6665 16.0001 2.6665C23.3641 2.6665 29.3334 8.63584 29.3334 15.9998C29.3334 23.3638 23.3641 29.3332 16.0001 29.3332C8.63608 29.3332 2.66675 23.3638 2.66675 15.9998ZM16.0001 5.33317C13.1711 5.33317 10.458 6.45698 8.45761 8.45737C6.45722 10.4578 5.33341 13.1709 5.33341 15.9998C5.33341 18.8288 6.45722 21.5419 8.45761 23.5423C10.458 25.5427 13.1711 26.6665 16.0001 26.6665C18.8291 26.6665 21.5422 25.5427 23.5426 23.5423C25.5429 21.5419 26.6667 18.8288 26.6667 15.9998C26.6667 13.1709 25.5429 10.4578 23.5426 8.45737C21.5422 6.45698 18.8291 5.33317 16.0001 5.33317Z"
        fill="#101010"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.3333 9.33333C17.3333 8.97971 17.1929 8.64057 16.9428 8.39052C16.6928 8.14048 16.3536 8 16 8C15.6464 8 15.3072 8.14048 15.0572 8.39052C14.8071 8.64057 14.6667 8.97971 14.6667 9.33333V14.6667H9.33333C8.97971 14.6667 8.64057 14.8071 8.39052 15.0572C8.14048 15.3072 8 15.6464 8 16C8 16.3536 8.14048 16.6928 8.39052 16.9428C8.64057 17.1929 8.97971 17.3333 9.33333 17.3333H14.6667V22.6667C14.6667 23.0203 14.8071 23.3594 15.0572 23.6095C15.3072 23.8595 15.6464 24 16 24C16.3536 24 16.6928 23.8595 16.9428 23.6095C17.1929 23.3594 17.3333 23.0203 17.3333 22.6667V17.3333H22.6667C23.0203 17.3333 23.3594 17.1929 23.6095 16.9428C23.8595 16.6928 24 16.3536 24 16C24 15.6464 23.8595 15.3072 23.6095 15.0572C23.3594 14.8071 23.0203 14.6667 22.6667 14.6667H17.3333V9.33333Z"
        fill="#101010"
      />
    </svg>
  );
};

// (새 설문) 새 페이지 종이플러스 아이콘
export const AddPageIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
    >
      <g clipPath="url(#clip0_862_5928)">
        <path
          d="M18.6146 2.6665C19.2407 2.66666 19.8467 2.88708 20.3266 3.28917L20.4999 3.44784L26.3853 9.33317C26.8279 9.77587 27.1008 10.3602 27.1559 10.9838L27.1666 11.2185V26.6665C27.1668 27.3393 26.9127 27.9873 26.4553 28.4806C25.9978 28.9739 25.3708 29.276 24.6999 29.3265L24.4999 29.3332H8.49992C7.82715 29.3334 7.17916 29.0793 6.68585 28.6218C6.19255 28.1644 5.89038 27.5374 5.83992 26.8665L5.83325 26.6665V5.33317C5.83304 4.6604 6.08713 4.01242 6.54458 3.51911C7.00204 3.0258 7.62905 2.72363 8.29992 2.67317L8.49992 2.6665H18.6146ZM16.4999 5.33317H8.49992V26.6665H24.4999V13.3332H18.4999C17.9695 13.3332 17.4608 13.1225 17.0857 12.7474C16.7106 12.3723 16.4999 11.8636 16.4999 11.3332V5.33317ZM16.4999 15.3332C16.8535 15.3332 17.1927 15.4736 17.4427 15.7237C17.6928 15.9737 17.8333 16.3129 17.8333 16.6665V18.6665H19.8333C20.1869 18.6665 20.526 18.807 20.7761 19.057C21.0261 19.3071 21.1666 19.6462 21.1666 19.9998C21.1666 20.3535 21.0261 20.6926 20.7761 20.9426C20.526 21.1927 20.1869 21.3332 19.8333 21.3332H17.8333V23.3332C17.8333 23.6868 17.6928 24.0259 17.4427 24.276C17.1927 24.526 16.8535 24.6665 16.4999 24.6665C16.1463 24.6665 15.8072 24.526 15.5571 24.276C15.3071 24.0259 15.1666 23.6868 15.1666 23.3332V21.3332H13.1666C12.813 21.3332 12.4738 21.1927 12.2238 20.9426C11.9737 20.6926 11.8333 20.3535 11.8333 19.9998C11.8333 19.6462 11.9737 19.3071 12.2238 19.057C12.4738 18.807 12.813 18.6665 13.1666 18.6665H15.1666V16.6665C15.1666 16.3129 15.3071 15.9737 15.5571 15.7237C15.8072 15.4736 16.1463 15.3332 16.4999 15.3332ZM19.1666 5.88517V10.6665H23.9479L19.1666 5.88517Z"
          fill="#101010"
        />
      </g>
      <defs>
        <clipPath id="clip0_862_5928">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

// (새 설문) < 이거 아이콘
export const PrevPageIcon = ({ isBlue }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M19.8799 8.94657C19.7566 8.82296 19.61 8.7249 19.4487 8.65799C19.2875 8.59108 19.1145 8.55664 18.9399 8.55664C18.7653 8.55664 18.5924 8.59108 18.4311 8.65799C18.2698 8.7249 18.1233 8.82296 17.9999 8.94657L11.8799 15.0666C11.7563 15.1899 11.6582 15.3364 11.5913 15.4977C11.5244 15.659 11.49 15.8319 11.49 16.0066C11.49 16.1812 11.5244 16.3541 11.5913 16.5154C11.6582 16.6767 11.7563 16.8232 11.8799 16.9466L17.9999 23.0666C18.1234 23.19 18.2699 23.2879 18.4312 23.3547C18.5925 23.4215 18.7653 23.4559 18.9399 23.4559C19.1145 23.4559 19.2874 23.4215 19.4486 23.3547C19.6099 23.2879 19.7565 23.19 19.8799 23.0666C20.0034 22.9431 20.1013 22.7966 20.1681 22.6353C20.2349 22.474 20.2693 22.3011 20.2693 22.1266C20.2693 21.952 20.2349 21.7791 20.1681 21.6178C20.1013 21.4566 20.0034 21.31 19.8799 21.1866L14.7066 15.9999L19.8799 10.8266C20.3866 10.3066 20.3866 9.45323 19.8799 8.94657Z"
        fill={isBlue ? "#6E7CF2" : "#101010"}
      />
    </svg>
  );
};

// (새 설문) > 이거 아이콘
export const NextPageIcon = ({ isBlue }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M12.4134 8.94686C12.2898 9.07021 12.1917 9.21673 12.1248 9.37803C12.0579 9.53932 12.0234 9.71223 12.0234 9.88686C12.0234 10.0615 12.0579 10.2344 12.1248 10.3957C12.1917 10.557 12.2898 10.7035 12.4134 10.8269L17.5867 16.0002L12.4134 21.1735C12.1641 21.4228 12.024 21.761 12.024 22.1135C12.024 22.4661 12.1641 22.8042 12.4134 23.0535C12.6627 23.3028 13.0008 23.4429 13.3534 23.4429C13.7059 23.4429 14.0441 23.3028 14.2934 23.0535L20.4134 16.9335C20.537 16.8102 20.635 16.6637 20.7019 16.5024C20.7688 16.3411 20.8033 16.1681 20.8033 15.9935C20.8033 15.8189 20.7688 15.646 20.7019 15.4847C20.635 15.3234 20.537 15.1769 20.4134 15.0535L14.2934 8.93353C13.7867 8.42686 12.9334 8.42686 12.4134 8.94686Z"
        fill={isBlue ? "#6E7CF2" : "#101010"}
      />
    </svg>
  );
};

// 저장 아이콘
export const SaveIcon = ({ isSmall }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={isSmall ? "16" : "33"}
      height={isSmall ? "16" : "32"}
      viewBox="0 0 33 32"
      fill="none"
    >
      <path
        d="M11.1666 5.3335H8.49992C7.79267 5.3335 7.1144 5.61445 6.6143 6.11454C6.1142 6.61464 5.83325 7.29292 5.83325 8.00016V24.0002C5.83325 24.7074 6.1142 25.3857 6.6143 25.8858C7.1144 26.3859 7.79267 26.6668 8.49992 26.6668H24.4999C25.2072 26.6668 25.8854 26.3859 26.3855 25.8858C26.8856 25.3857 27.1666 24.7074 27.1666 24.0002V10.4375C27.1664 9.73031 26.8854 9.05214 26.3853 8.55216L23.9479 6.11483C23.4479 5.6147 22.7698 5.33365 22.0626 5.3335H20.4999M11.1666 5.3335V10.6668C11.1666 11.0205 11.3071 11.3596 11.5571 11.6096C11.8072 11.8597 12.1463 12.0002 12.4999 12.0002H19.1666C19.5202 12.0002 19.8593 11.8597 20.1094 11.6096C20.3594 11.3596 20.4999 11.0205 20.4999 10.6668V5.3335M11.1666 5.3335H20.4999M9.83325 22.6668V18.6668C9.83325 18.3132 9.97373 17.9741 10.2238 17.724C10.4738 17.474 10.813 17.3335 11.1666 17.3335H21.8333C22.1869 17.3335 22.526 17.474 22.7761 17.724C23.0261 17.9741 23.1666 18.3132 23.1666 18.6668V22.6668"
        stroke="#6E7CF2"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BanIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99992 1.33301C11.6666 1.33301 14.6666 4.33301 14.6666 7.99967C14.6666 11.6663 11.6666 14.6663 7.99992 14.6663C4.33325 14.6663 1.33325 11.6663 1.33325 7.99967C1.33325 4.33301 4.33325 1.33301 7.99992 1.33301ZM7.99992 2.66634C6.73325 2.66634 5.59992 3.06634 4.73325 3.79967L12.1999 11.2663C12.8666 10.333 13.3333 9.19967 13.3333 7.99967C13.3333 5.06634 10.9333 2.66634 7.99992 2.66634ZM11.2666 12.1997L3.79992 4.73301C3.06659 5.59967 2.66659 6.73301 2.66659 7.99967C2.66659 10.933 5.06659 13.333 7.99992 13.333C9.26659 13.333 10.3999 12.933 11.2666 12.1997Z"
        fill="#D52828"
      />
    </svg>
  );
};

// x 아이콘
export const XIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
    >
      <path
        d="M1.48 1.48C1.52638 1.43356 1.58145 1.39671 1.64208 1.37157C1.70271 1.34644 1.7677 1.3335 1.83333 1.3335C1.89897 1.3335 1.96395 1.34644 2.02458 1.37157C2.08521 1.39671 2.14029 1.43356 2.18667 1.48L4 3.29267L5.81333 1.48C5.85973 1.4336 5.91482 1.39679 5.97544 1.37168C6.03607 1.34657 6.10105 1.33364 6.16667 1.33364C6.23229 1.33364 6.29726 1.34657 6.35789 1.37168C6.41851 1.39679 6.4736 1.4336 6.52 1.48C6.5664 1.5264 6.60321 1.58148 6.62832 1.64211C6.65343 1.70273 6.66636 1.76771 6.66636 1.83333C6.66636 1.89895 6.65343 1.96393 6.62832 2.02456C6.60321 2.08518 6.5664 2.14027 6.52 2.18667L4.70733 4L6.52 5.81333C6.61371 5.90704 6.66636 6.03414 6.66636 6.16667C6.66636 6.29919 6.61371 6.42629 6.52 6.52C6.42629 6.61371 6.29919 6.66636 6.16667 6.66636C6.03414 6.66636 5.90704 6.61371 5.81333 6.52L4 4.70733L2.18667 6.52C2.09296 6.61371 1.96586 6.66636 1.83333 6.66636C1.70081 6.66636 1.57371 6.61371 1.48 6.52C1.38629 6.42629 1.33364 6.29919 1.33364 6.16667C1.33364 6.03414 1.38629 5.90704 1.48 5.81333L3.29267 4L1.48 2.18667C1.43356 2.14029 1.39671 2.08521 1.37157 2.02458C1.34644 1.96395 1.3335 1.89897 1.3335 1.83333C1.3335 1.7677 1.34644 1.70271 1.37157 1.64208C1.39671 1.58145 1.43356 1.52638 1.48 1.48Z"
        fill="#6E7CF2"
      />
    </svg>
  );
};