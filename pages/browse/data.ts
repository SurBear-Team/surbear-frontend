export interface IDummyData {
  id: number;
  user: string;
  title: string;
  description: string;
  category: string;
  point: number;
  started: string;
  deadline: string;
  userCount: number;
  quesCount: number;
}

export const dummyData: IDummyData[] = [
  {
    id: 1,
    user: "김치냉장고",
    title: "설문조사1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi, libero adipisci cumque corrupti laudantium architecto facilis, asperiores eos ipsa perferendis hic vel culpa cum praesentium recusandae nisi! Molestiae, incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi, libero adipisci cumque corrupti laudantium architecto facilis, asperiores eos ipsa perferendis hic vel culpa cum praesentium recusandae nisi! Molestiae, incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi, libero adipisci cumque corrupti laudantium architecto facilis, asperiores eos ipsa perferendis hic vel culpa cum praesentium recusandae nisi! Molestiae, incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi, libero adipisci cumque corrupti laudantium architecto facilis, asperiores eos ipsa perferendis hic vel culpa cum praesentium recusandae nisi! Molestiae, incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi, libero adipisci cumque corrupti laudantium architecto facilis, asperiores eos ipsa perferendis hic vel culpa cum praesentium recusandae nisi! Molestiae, incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi, libero adipisci cumque corrupti laudantium architecto facilis, asperiores eos ipsa perferendis hic vel culpa cum praesentium recusandae nisi! Molestiae, incidunt.",
    category: "사회",
    point: 5,
    started: "2024-04-10",
    deadline: "2024-04-13-14",
    quesCount: 20,
    userCount: 10,
  },
  {
    id: 2,
    user: "드럼세탁기",
    title: "설문조사2",
    description: "Lorem ipsum dolor sit",
    category: "사회",
    point: 15,
    started: "2024-04-09",
    deadline: "2024-04-13-14",
    quesCount: 30,
    userCount: 20,
  },
  {
    id: 3,
    user: "김치세탁기",
    title: "설문조사3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi, libero adipisci cumque corrupti laudantium architecto facilis, asperiores eos ipsa perferendis hic vel culpa cum praesentium recusandae nisi! Molestiae, incidunt.",
    category: "사회",
    point: 5,
    started: "2024-04-08",
    deadline: "2024-04-13-14",
    quesCount: 23,
    userCount: 16,
  },
  {
    id: 4,
    user: "드럼냉장고",
    title: "설문조사4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi, libero adipisci cumque corrupti laudantium architecto facilis, asperiores eos ipsa perferendis hic vel culpa cum praesentium recusandae nisi! Molestiae, incidunt.",
    category: "사회",
    point: 10,
    started: "2024-04-07",
    deadline: "2024-04-13-14",
    quesCount: 36,
    userCount: 14,
  },
];

export const categoryList = [
  "전체",
  "사회",
  "경제",
  "생활",
  "취미",
  "IT",
  "문화",
  "기타",
];

export const orderList = [
  "최신순",
  "높은 포인트순",
  "적은 문항수순",
  "많은 문항수순",
];
