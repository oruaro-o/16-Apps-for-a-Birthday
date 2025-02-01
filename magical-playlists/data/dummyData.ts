export interface Song {
  title: string
  artist: string
  duration: string
}

export interface TestData {
  playlists: {
    name: string
    id: string
    songs?: Song[]
  }[]
  songs: {
    [key: string]: Song[]
  }
}

export const DUMMY_DATA: TestData = {
  playlists: [
    { name: "Running", id: "run_1" },
    { name: "Dancing", id: "dance_1" },
    { name: "Having cool fun", id: "fun_1" },
    { name: "Dreaming", id: "dream_1" },
    { name: "Working hard 😜", id: "work_1" },
  ],
  songs: {
    run_1: [
      { title: "Run boy run", artist: "Woodkid", duration: "3:33" },
      { title: "Till I collapse", artist: "Eminem", duration: "4:57" },
      { title: "The Motto", artist: "Drake", duration: "3:01" },
    ],
  },
}

