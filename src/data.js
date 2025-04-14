import Thumbnail1 from "./assets/flag.jpg";
import Thumbnail2 from './assets/falg2.jpg';
import Thumbnail3 from './assets/flag3.jpg';
import Candidate2 from './assets/candidate2.jpg';
import Candidate3 from './assets/candidate3.jpg';
import Candidate4 from './assets/candidate4.jpg';
import Candidate5 from './assets/candidate5.jpg';

export const elections = [
  {
    id: "e1",
    title: "Harvard Presidential Elections 2024",
    description: "Provident similique accusantium nemo autem. Veritatis obcaecati...",
    thumbnail: Thumbnail1,
    candidates: ["c1", "c2", "c3", "c4"],
    voters: []
  },
  {
    id: "e2",
    title: "Stanford Senate Elections",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    thumbnail: Thumbnail2,
    candidates: ["c5", "c6", "c7"],
    voters: []
  },
  {
    id: "e3",
    title: "MIT Student Union Vote",
    description: "Voluptas asperiores nemo optio dolores at fugiat, accusamus.",
    thumbnail: Thumbnail3,
    candidates: ["c8", "c9"],
    voters: []
  },
  {
    id: "e4",
    title: "UCLA Cultural Committee Elections",
    description: "Commodi aliquid sequi illo at, repellendus praesentium!",
    thumbnail: Candidate2,
    candidates: ["c10", "c11", "c12"],
    voters: []
  },
  {
    id: "e5",
    title: "IIT Delhi General Secretary Polls",
    description: "Neque aliquid molestiae voluptates quae doloremque eveniet.",
    thumbnail: Candidate2,
    candidates: ["c13", "c14", "c15", "c16"],
    voters: []
  }
];

export const candidates = [
    {
        id:"c1",
        fullName:"Chandra Babu",
        image:Candidate3,
        motto:`vanakam da mapla`,
        voteCount:190,
        election:"e2"
    },
    {
        id:"c2",
        fullName:"Chandra Babu",
        image:Candidate4,
        motto:`vanakam da mapla`,
        voteCount:190,
        election:"e1"
    },
    {
        id:"c3",
        fullName:"Chandra Babu",
        image:Candidate5,
        motto:`vanakam da mapla`,
        voteCount:190,
        election:"e2"
    },
    {
        id:"c4",
        fullName:"Chandra Babu",
        image:Candidate3,
        motto:`vanakam da mapla`,
        voteCount:190,
        election:"e2"
    },
    {
        id:"c5",
        fullName:"Chandra Babu",
        image:Candidate3,
        motto:`vanakam da mapla`,
        voteCount:190,
        election:"e2"
    },
];

export const voters = [
    {
      id: "v1",
      fullName: "Ernest Achiever",
      email: "achiever@gmail.com",
      password: "achiever123",
      isAdmin: true,
      votedElections: ["e2"]
    },
    {
      id: "v2",
      fullName: "Doris Lartey",
      email: "doris@gmail.com",
      password: "doris123",
      isAdmin: false,
      votedElections: ["e1", "e2"]
    },
    {
      id: "v3",
      fullName: "Daniel Viny0",
      email: "daniel@gmail.com",
      password: "daniel123",
      isAdmin: false,
      votedElections: []
    },
    {
      id: "v4",
      fullName: "Aisha Khan",
      email: "aisha@gmail.com",
      password: "aisha123",
      isAdmin: false,
      votedElections: ["e3", "e5"]
    },
    {
      id: "v5",
      fullName: "John Patel",
      email: "johnp@gmail.com",
      password: "john123",
      isAdmin: false,
      votedElections: ["e1"]
    }
  ];
  