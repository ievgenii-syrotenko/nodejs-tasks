const database = {
  getUser: (id, callback) => {
    const users = [
      {
        id: 1,
        name: "Robert",
      },
      {
        id: 2,
        name: "John",
      },
    ];

    const user = users.find((user) => user.id === id);
    if (!user) {
      callback(`User with id=${id} not found`);
    } else {
      callback(null, user);
    }
  },
  getUsersBook: (userId, callback) => {
    const usersBooks = {
      1: [],
      2: [1, 2],
    };

    const userBook = usersBooks[userId];
    if (!userBook) {
      callback(`Set of books related to userId=${userId} not found`);
    } else {
      callback(null, userBook);
    }
  },
  buyBook: (id, callback) => {
    const books = [
      {
        id: 1,
        name: "Art of war",
      },
      {
        id: 2,
        name: "Hunger games",
      },
      {
        id: 3,
        name: "1984",
      },
    ];

    const book = books.find((book) => book.id === id);
    if (!book) {
      callback(`Book with id=${id} not found`);
    } else {
      callback(null, true);
    }
  },
};

function wrapper(obj, method, ...params) {
  return new Promise((resolve, reject) => {
    obj[method](params[0], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

const buyBookForUser = async (bookId, userId, callback) => {
  try {
    // get user
    await wrapper(database, "getUser", userId);
    // get user books
    const userBooks = await wrapper(database, "getUsersBook", userId);

    // check if user has book
    if (userBooks.includes(bookId)) {
      callback(`User already has book with id=${bookId}`);
      return;
    }

    // buy book
    await wrapper(database, "buyBook", bookId);

    callback(null, "Success");
  } catch (e) {
    // error if something went wrong (rejected promise)
    callback(e);
  }
};

(async () => {
  console.log("Call 1, 1:");
  await buyBookForUser(1, 1, (err, message) => {
    console.log(err); // null
    console.log(message); // 'Success'
  });

  console.log("Call 1, 2:");
  await buyBookForUser(1, 2, (err, message) => {
    console.log(err); // 'User already has book with id=1'
    console.log(message); // undefined
  });

  console.log("Call 3, 2:");
  await buyBookForUser(3, 2, (err, message) => {
    console.log(err); // null
    console.log(message); // 'Success'
  });

  console.log("Call 5, 2:");
  await buyBookForUser(5, 2, (err, message) => {
    console.log(err); // 'Book with id=5 not found'
    console.log(message); // undefined
  });

  console.log("Call 1, 3:");
  await buyBookForUser(1, 3, (err, message) => {
    console.log(err); // 'User with id=3 not found'
    console.log(message); // undefined
  });
})();
