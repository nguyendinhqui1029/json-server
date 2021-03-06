const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const queryString = require('query-string');
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3200;
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
    req.body.updateddAt = Date.now();
  }else if (req.method === "PATCH") {
    req.body.updateddAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

//Modify response 
router.render=(req,res)=>{
  const headers = res.getHeaders();
  const totalCount = headers["x-total-count"];
  if(req.method === "GET" && totalCount ){
    const queryParam = queryString.parse(req._parsedUrl.query);
    return res.jsonp({
      data: res.locals.data,
      pagination: {
        _limit: queryParam._limit || 10,
        _page: queryParam._page || 1,
        totalRow: totalCount,
      },
    });
  }
  res.jsonp(res.locals.data);
};
server.route("/api", (req, res) => {
   res.sendFile("public/api/index.html", { root: __dirname });
});
// Use default router
server.use('/api',router);
server.listen(PORT, () => {
  console.log("JSON Server is running");
});
