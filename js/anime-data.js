// Comprehensive anime data with categories
const allAnimeData = [
    {
        id: 1,
        title: "Demon Slayer: Kimetsu no Yaiba",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400",
        rating: 8.6,
        year: 2019,
        episodes: 26,
        categories: ["Action", "Fantasy", "Shonen", "Supernatural", "Hindi Dubbed"],
        description: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly."
    },
    {
        id: 2,
        title: "Attack on Titan",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400",
        rating: 9.0,
        year: 2013,
        episodes: 87,
        categories: ["Action", "Drama", "Fantasy", "Shonen", "Hindi Dubbed", "Tamil Dubbed"],
        description: "After his hometown is destroyed and his mother is killed, Eren Jaeger vows to cleanse the earth of the giant humanoid Titans."
    },
    {
        id: 3,
        title: "Spy x Family",
        image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2b5?w=400",
        rating: 8.7,
        year: 2022,
        episodes: 25,
        categories: ["Comedy", "Action", "Slice of Life", "Shonen"],
        description: "A spy must create a fake family to complete his mission, but ends up with a telepath daughter and an assassin wife."
    },
    {
        id: 4,
        title: "One Piece",
        image: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400",
        rating: 8.9,
        year: 1999,
        episodes: 1090,
        categories: ["Action", "Adventure", "Fantasy", "Shonen", "Hindi Dubbed"],
        description: "Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as One Piece."
    },
    {
        id: 5,
        title: "My Hero Academia",
        image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400",
        rating: 8.4,
        year: 2016,
        episodes: 138,
        categories: ["Action", "Adventure", "Shonen", "Supernatural", "Hindi Dubbed", "Tamil Dubbed"],
        description: "A superhero-loving boy without any powers enrolls in a prestigious hero academy and learns what it really means to be a hero."
    },
    {
        id: 6,
        title: "Jujutsu Kaisen",
        image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400",
        rating: 8.6,
        year: 2020,
        episodes: 47,
        categories: ["Action", "Fantasy", "Shonen", "Supernatural", "Hindi Dubbed"],
        description: "A boy swallows a cursed talisman and becomes possessed by a powerful Curse, leading him into the world of sorcery."
    },
    {
        id: 7,
        title: "Death Note",
        image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400",
        rating: 9.0,
        year: 2006,
        episodes: 37,
        categories: ["Thriller", "Supernatural", "Seinen", "Hindi Dubbed", "Tamil Dubbed", "Telugu Dubbed"],
        description: "An intelligent high school student finds a notebook that can kill anyone whose name is written in it."
    },
    {
        id: 8,
        title: "Naruto Shippuden",
        image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400",
        rating: 8.7,
        year: 2007,
        episodes: 500,
        categories: ["Action", "Adventure", "Fantasy", "Shonen", "Hindi Dubbed", "Tamil Dubbed"],
        description: "Naruto Uzumaki returns after years of training to face new threats and fulfill his dream of becoming Hokage."
    },
    {
        id: 9,
        title: "Fullmetal Alchemist: Brotherhood",
        image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400",
        rating: 9.1,
        year: 2009,
        episodes: 64,
        categories: ["Action", "Adventure", "Drama", "Fantasy", "Shonen"],
        description: "Two brothers search for the Philosopher's Stone after an attempt to revive their mother goes horribly wrong."
    },
    {
        id: 10,
        title: "Sword Art Online",
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400",
        rating: 7.6,
        year: 2012,
        episodes: 96,
        categories: ["Action", "Adventure", "Fantasy", "Romance", "Hindi Dubbed"],
        description: "Players of a virtual reality MMORPG find themselves trapped in the game, where death in the game means death in real life."
    },
    {
        id: 11,
        title: "Tokyo Ghoul",
        image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=400",
        rating: 7.8,
        year: 2014,
        episodes: 48,
        categories: ["Action", "Drama", "Horror", "Supernatural", "Seinen", "Hindi Dubbed"],
        description: "A college student survives an attack from a ghoul and undergoes surgery that transforms him into a half-ghoul."
    },
    {
        id: 12,
        title: "Hunter x Hunter",
        image: "https://images.unsplash.com/photo-1571442463800-1337d7af9d2f?w=400",
        rating: 9.0,
        year: 2011,
        episodes: 148,
        categories: ["Action", "Adventure", "Fantasy", "Shonen"],
        description: "A young boy named Gon sets out to become a Hunter and find his father who abandoned him at a young age."
    },
    {
        id: 13,
        title: "Steins;Gate",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400",
        rating: 9.1,
        year: 2011,
        episodes: 24,
        categories: ["Sci-Fi", "Thriller", "Drama"],
        description: "A group of friends discover they can send messages to the past, but their experiments have dire consequences."
    },
    {
        id: 14,
        title: "Your Name (Kimi no Na wa)",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
        rating: 8.4,
        year: 2016,
        episodes: 1,
        categories: ["Romance", "Drama", "Fantasy", "Hindi Dubbed"],
        description: "Two strangers find themselves linked in a bizarre way and must find each other when they mysteriously swap bodies."
    },
    {
        id: 15,
        title: "One Punch Man",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400",
        rating: 8.7,
        year: 2015,
        episodes: 24,
        categories: ["Action", "Comedy", "Seinen", "Supernatural", "Hindi Dubbed"],
        description: "A superhero who can defeat any opponent with a single punch is bored with his overwhelming power."
    },
    {
        id: 16,
        title: "Mob Psycho 100",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        rating: 8.5,
        year: 2016,
        episodes: 37,
        categories: ["Action", "Comedy", "Supernatural", "Shonen"],
        description: "A middle schooler with immense psychic power tries to live a normal life while working as an assistant to a con artist psychic."
    },
    {
        id: 17,
        title: "Violet Evergarden",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400",
        rating: 8.4,
        year: 2018,
        episodes: 13,
        categories: ["Drama", "Fantasy", "Slice of Life"],
        description: "A former soldier becomes an Auto Memory Doll, writing letters for those who cannot express their feelings."
    },
    {
        id: 18,
        title: "Haikyuu!!",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400",
        rating: 8.6,
        year: 2014,
        episodes: 85,
        categories: ["Sports", "Comedy", "Drama", "Shonen"],
        description: "A short boy joins his school's volleyball team and aims to become the team's ace despite his height disadvantage."
    },
    {
        id: 19,
        title: "Cowboy Bebop",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400",
        rating: 8.9,
        year: 1998,
        episodes: 26,
        categories: ["Action", "Adventure", "Sci-Fi", "Seinen"],
        description: "A group of bounty hunters travel through space on their ship, the Bebop, while dealing with their pasts."
    },
    {
        id: 20,
        title: "Code Geass",
        image: "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=400",
        rating: 8.7,
        year: 2006,
        episodes: 50,
        categories: ["Action", "Drama", "Sci-Fi", "Shonen"],
        description: "An exiled prince gains the power of Geass and leads a rebellion against the empire that conquered his homeland."
    },
    {
        id: 21,
        title: "Fairy Tail",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
        rating: 7.9,
        year: 2009,
        episodes: 328,
        categories: ["Action", "Adventure", "Fantasy", "Shonen", "Hindi Dubbed"],
        description: "A celestial wizard joins Fairy Tail, the guild famous for its powerful and reckless members."
    },
    {
        id: 22,
        title: "Dragon Ball Z",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        rating: 8.8,
        year: 1989,
        episodes: 291,
        categories: ["Action", "Adventure", "Fantasy", "Shonen", "Hindi Dubbed", "Tamil Dubbed", "Telugu Dubbed"],
        description: "Goku and his friends defend Earth against villains ranging from intergalactic conquerors to androids and magical creatures."
    },
    {
        id: 23,
        title: "Black Clover",
        image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=400",
        rating: 8.2,
        year: 2017,
        episodes: 170,
        categories: ["Action", "Fantasy", "Shonen", "Hindi Dubbed"],
        description: "A boy born without magical powers in a magical world dreams of becoming the Wizard King."
    },
    {
        id: 24,
        title: "Bleach",
        image: "https://images.unsplash.com/photo-1523464862212-d6631d073194?w=400",
        rating: 8.2,
        year: 2004,
        episodes: 366,
        categories: ["Action", "Adventure", "Supernatural", "Shonen", "Hindi Dubbed"],
        description: "A teenager gains the powers of a Soul Reaper and must defend humans from evil spirits and guide departed souls to the afterlife."
    },
    {
        id: 25,
        title: "Tokyo Revengers",
        image: "https://images.unsplash.com/photo-1528165228341-024f7b6f7c45?w=400",
        rating: 7.9,
        year: 2021,
        episodes: 50,
        categories: ["Action", "Drama", "Supernatural", "Shonen", "Hindi Dubbed"],
        description: "A young man travels back in time to save his girlfriend from being killed by a gang."
    },
    {
        id: 26,
        title: "The Promised Neverland",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
        rating: 8.3,
        year: 2019,
        episodes: 23,
        categories: ["Thriller", "Drama", "Fantasy", "Shonen"],
        description: "Children at an orphanage discover a horrifying secret and plan an escape before it's too late."
    },
    {
        id: 27,
        title: "Chainsaw Man",
        image: "https://images.unsplash.com/photo-1574451495862-7bdfc75e7049?w=400",
        rating: 8.5,
        year: 2022,
        episodes: 12,
        categories: ["Action", "Horror", "Supernatural", "Shonen"],
        description: "A boy becomes a devil hunter and merges with his pet devil to gain chainsaw powers."
    },
    {
        id: 28,
        title: "Vinland Saga",
        image: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=400",
        rating: 8.8,
        year: 2019,
        episodes: 48,
        categories: ["Action", "Adventure", "Drama", "Seinen"],
        description: "A young Viking warrior seeks revenge for his father's death while caught in the war between England and Denmark."
    },
    {
        id: 29,
        title: "Frieren: Beyond Journey's End",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400",
        rating: 9.2,
        year: 2023,
        episodes: 28,
        categories: ["Adventure", "Drama", "Fantasy"],
        description: "An elf mage reflects on her thousand-year journey and the brief but meaningful time spent with her companions."
    },
    {
        id: 30,
        title: "Mushoku Tensei",
        image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400",
        rating: 8.4,
        year: 2021,
        episodes: 23,
        categories: ["Adventure", "Drama", "Fantasy"],
        description: "A jobless man is reincarnated in a magical world and vows to live his new life to the fullest."
    },
    {
        id: 31,
        title: "Blue Lock",
        image: "https://images.unsplash.com/photo-1487837647815-bbc1f30cd0d2?w=400",
        rating: 8.3,
        year: 2022,
        episodes: 24,
        categories: ["Sports", "Shonen", "Drama"],
        description: "300 high school strikers enter a training facility to become the world's greatest egotistical striker."
    },
    {
        id: 32,
        title: "Hell's Paradise",
        image: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=400",
        rating: 8.0,
        year: 2023,
        episodes: 13,
        categories: ["Action", "Adventure", "Fantasy", "Seinen"],
        description: "A death row inmate is offered a pardon if he can retrieve the elixir of life from a mysterious island."
    },
    {
        id: 33,
        title: "The Eminence in Shadow",
        image: "https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=400",
        rating: 7.9,
        year: 2022,
        episodes: 20,
        categories: ["Action", "Comedy", "Fantasy"],
        description: "A boy pretends to be a mastermind in the shadows, only to find his fantasies becoming reality."
    },
    {
        id: 34,
        title: "Re:Zero",
        image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400",
        rating: 8.2,
        year: 2016,
        episodes: 50,
        categories: ["Drama", "Fantasy", "Thriller"],
        description: "A boy is transported to a fantasy world where he dies and resets to a checkpoint each time."
    },
    {
        id: 35,
        title: "Overlord",
        image: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=400",
        rating: 7.9,
        year: 2015,
        episodes: 52,
        categories: ["Action", "Adventure", "Fantasy"],
        description: "A player gets trapped in an MMORPG as his character, an all-powerful skeletal sorcerer, and sets out to conquer the new world."
    },
    {
        id: 36,
        title: "That Time I Got Reincarnated as a Slime",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
        rating: 8.1,
        year: 2018,
        episodes: 48,
        categories: ["Action", "Adventure", "Comedy", "Fantasy"],
        description: "A man is reincarnated as a slime in a fantasy world and gains unique powers as he builds a nation."
    },
    {
        id: 37,
        title: "Konosuba",
        image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400",
        rating: 8.1,
        year: 2016,
        episodes: 20,
        categories: ["Adventure", "Comedy", "Fantasy"],
        description: "A boy dies and is sent to a fantasy world with a useless goddess, forming the most dysfunctional adventuring party."
    },
    {
        id: 38,
        title: "Horimiya",
        image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400",
        rating: 8.0,
        year: 2021,
        episodes: 13,
        categories: ["Romance", "Comedy", "Slice of Life", "Shonen"],
        description: "Two high school students discover each other's hidden sides and develop a close relationship."
    },
    {
        id: 39,
        title: "Kaguya-sama: Love is War",
        image: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=400",
        rating: 8.5,
        year: 2019,
        episodes: 37,
        categories: ["Romance", "Comedy", "Seinen"],
        description: "Two genius students at an elite academy try to make the other confess their love first in a battle of wits."
    },
    {
        id: 40,
        title: "Toradora!",
        image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400",
        rating: 8.1,
        year: 2008,
        episodes: 25,
        categories: ["Romance", "Comedy", "Drama", "Slice of Life"],
        description: "A delinquent-looking boy and a tiny but fierce girl form an unlikely alliance to help each other with their crushes."
    },
    {
        id: 41,
        title: "Clannad: After Story",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400",
        rating: 9.0,
        year: 2008,
        episodes: 24,
        categories: ["Drama", "Romance", "Slice of Life"],
        description: "The continuation of Clannad follows the lives of the characters as they deal with real-world problems."
    },
    {
        id: 42,
        title: "Your Lie in April",
        image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400",
        rating: 8.6,
        year: 2014,
        episodes: 22,
        categories: ["Drama", "Romance", "Slice of Life"],
        description: "A piano prodigy who lost his ability to hear piano notes meets a free-spirited violinist who changes his life."
    },
    {
        id: 43,
        title: "Anohana",
        image: "https://images.unsplash.com/photo-1498462440456-0dba182e775b?w=400",
        rating: 8.3,
        year: 2011,
        episodes: 11,
        categories: ["Drama", "Slice of Life", "Supernatural"],
        description: "A group of childhood friends reunite when the ghost of their deceased friend appears to them."
    },
    {
        id: 44,
        title: "Neon Genesis Evangelion",
        image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400",
        rating: 8.5,
        year: 1995,
        episodes: 26,
        categories: ["Action", "Drama", "Sci-Fi", "Seinen"],
        description: "Teenagers pilot giant bio-machines to defend Earth against mysterious beings while dealing with psychological trauma."
    },
    {
        id: 45,
        title: "Made in Abyss",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
        rating: 8.7,
        year: 2017,
        episodes: 25,
        categories: ["Adventure", "Drama", "Fantasy"],
        description: "A girl descends into a mysterious abyss to find her missing mother, uncovering dark secrets along the way."
    },
    {
        id: 46,
        title: "Parasyte",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
        rating: 8.3,
        year: 2014,
        episodes: 24,
        categories: ["Action", "Horror", "Sci-Fi", "Seinen"],
        description: "A teenager must coexist with an alien parasite that failed to take over his brain and instead resides in his hand."
    },
    {
        id: 47,
        title: "Assassination Classroom",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
        rating: 8.1,
        year: 2015,
        episodes: 47,
        categories: ["Action", "Comedy", "Shonen"],
        description: "Students must assassinate their alien teacher who plans to destroy Earth, but he's also the best teacher they've ever had."
    },
    {
        id: 48,
        title: "No Game No Life",
        image: "https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=400",
        rating: 8.1,
        year: 2014,
        episodes: 12,
        categories: ["Adventure", "Comedy", "Fantasy"],
        description: "Two gaming siblings are transported to a world where everything is decided by games."
    },
    {
        id: 49,
        title: "Dr. Stone",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400",
        rating: 8.3,
        year: 2019,
        episodes: 35,
        categories: ["Adventure", "Sci-Fi", "Shonen"],
        description: "After all of humanity is turned to stone, a scientific genius awakens and aims to rebuild civilization."
    },
    {
        id: 50,
        title: "Fire Force",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400",
        rating: 7.7,
        year: 2019,
        episodes: 48,
        categories: ["Action", "Supernatural", "Shonen", "Hindi Dubbed"],
        description: "A special fire brigade fights against spontaneous human combustion while uncovering a conspiracy."
    }
];

// Get all unique categories from anime data
function getAllCategories() {
    const categoriesSet = new Set();
    allAnimeData.forEach(anime => {
        anime.categories.forEach(category => categoriesSet.add(category));
    });
    return Array.from(categoriesSet).sort();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allAnimeData, getAllCategories };
}
