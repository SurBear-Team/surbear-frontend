interface TermDetail {
  title: string;
  content: string;
}

interface TermsDetails {
  [key: string]: TermDetail;
}

export const termsContents: TermsDetails = {
  terms1: {
    title: "기본 규정",
    content: `
    제1조 (목적)\n
    본 약관은 서베어가 제공하는 서비스의 이용 조건 및 절차, 이용자와 서베어의 권리, 의무 및 책임사항 등 기본적인 사항을 규정함을 목적으로 합니다.\n\n
    제2조 (용어의 정의)\n
    "서비스"라 함은 서베어가 제공하는 모든 기능을 의미합니다.\n
    "이용자"라 함은 본 약관에 따라 서베어가 제공하는 서비스를 이용하는 자를 의미합니다.\n
    "포인트"라 함은 설문조사 참여를 통해 적립되는 가상의 포인트를 의미합니다.\n
    `,
  },
  terms2: {
    title: "이용자와 서비스의 관계",
    content: `
    제3조 (약관의 효력 및 변경)\n
    본 약관은 앱 화면에 게시하거나 기타의 방법(이메일을 통한 공지, 앱 내 공지사항 게시판 게시 등)으로 공지함으로써 그 효력이 발생합니다.\n
    서베어는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다. 변경된 약관은 공지 또는 통지함으로써 효력이 발생합니다.\n\n
    제4조 (회원 가입)\n
    이용자는 서베어가 정한 가입 양식에 따라 정보를 기입한 후 본 약관에 동의함으로써 회원 가입을 신청합니다.\n
    서베어는 전 항에 따라 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.\n
    1. 등록 내용에 허위, 기재누락, 오기가 있는 경우\n
    2. 기타 회원으로 등록하는 것이 서베어의 기술상 현저히 지장이 있다고 판단되는 경우\n\n
    제5조 (회원의 의무)\n
    회원은 다음 행위를 하여서는 안 됩니다.\n
    1. 회원 가입 신청 또는 변경 시 허위 내용을 등록하는 행위\n
    2. 타인의 정보 도용\n
    3. 서베어에 게시된 정보의 변경\n
    4. 서베어가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시\n
    5. 서베어 및 기타 제3자의 저작권 등 지적 재산권에 대한 침해\n
    6. 서베어 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위\n
    7. 외설 또는 폭력적인 메시지, 기타 공서양속에 반하는 정보를 서베어에 공개 또는 게시하는 행위\n
    회원은 본 약관, 관계 법령, 서베어가 정한 이용 안내 및 서비스와 관련하여 공지한 주의 사항을 준수하여야 합니다.\n
    `,
  },
  terms3: {
    title: "개인정보 및 책임",
    content: `
    제6조 (개인정보 보호)\n
    서베어는 이용자의 개인정보를 보호하기 위해 관련 법령에 따라 개인정보취급방침을 제정하고 이를 준수합니다.\n
    서베어는 이용자의 이메일, 아이디, 비밀번호, 닉네임, 나이대, 성별 등의 정보를 수집하며, 이 정보는 서비스 제공을 위해 사용됩니다.\n
    이용자는 언제든지 자신의 개인정보를 열람하거나 수정할 수 있으며, 서베어의 개인정보취급방침에 따라 언제든지 탈퇴를 요청할 수 있습니다.\n\n
    제7조 (계약 해지 및 이용 제한)\n
    이용자는 언제든지 서베어에 탈퇴를 요청할 수 있으며, 서베어는 즉시 회원 탈퇴를 처리합니다.\n
    서베어는 이용자가 본 약관 또는 관련 법령을 위반한 경우, 서비스 이용을 제한하거나 계약을 해지할 수 있습니다. 이용 제한 조건은 구체적인 위반 사항을 포함합니다.\n\n
    제8조 (책임의 한계)\n
    서베어는 천재지변, 전쟁, 기타 불가항력에 의해 서비스를 제공할 수 없는 경우에는 책임이 면제됩니다.\n
    서베어는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.\n\n
    제9조 (준거법 및 관할법원)\n
    본 약관은 대한민국 법에 따라 해석되고, 이에 따라 규율됩니다.\n
    서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 대한민국 법원을 관할 법원으로 합니다.\n
    `,
  },
};
