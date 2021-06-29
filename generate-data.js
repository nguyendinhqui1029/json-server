const faker = require("faker");
const fs = require("fs");
faker.locale = "vi";

generateCategories = (number) => {
  if (number <= 0) return [];
  categoryList = [];
  Array.from(new Array(number)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      idSubCategory: "",
      name: faker.commerce.department(),
      status: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });
  return categoryList;
};

generateProducts = (number, categoryId) => {
  if (number <= 0) return [];
  productList = [];
  Array.from(new Array(number)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      subContent: faker.commerce.productDescription().substr(0, 100),
      detailContent: faker.commerce.productDescription(),
      image: faker.image.fashion(),
      categoryId: categoryId,
      price: faker.commerce.price(100000, 2000000, 2),
      discount: faker.random.number({ min: 0, max: 60 }),
      isHot: faker.random.boolean(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    productList.push(category);
  });
  return productList;
};

generateNews = (number, categoryId) => {
  if (number <= 0) return [];
  newsList = [];
  Array.from(new Array(number)).forEach(() => {
    const news = {
      id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      subContent: faker.commerce.productDescription().substr(0, 100),
      detailContent: faker.commerce.productDescription(),
      image: faker.image.fashion(),
      categoryId: categoryId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    newsList.push(news);
  });
  return newsList;
};

generateUsers = (number) => {
  if (number <= 0) return [];
  userList = [];
  Array.from(new Array(number)).forEach(() => {
    const user = {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      avatar: faker.image.avatar(),
      name: faker.internet.userName(),
      role: faker.random.number({ min: 0, max: 3 }),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    userList.push(user);
  });
  return userList;
};
(() => {
  const categories = generateCategories(10);
  const products = [];
  const news = [];
  categories.forEach((category) => {
    products.push(...generateProducts(20, category.id));
    news.push(...generateNews(20, category.id));
  });
  const users = generateUsers(30);
  const db = {
    users: users,
    categories: categories,
    news: news,
    products: products,
    info: {},
  };

  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Generate data successfully.");
  });
})();
