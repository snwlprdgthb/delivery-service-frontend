module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    // tagName: "graphql",
    service: {
      name: "tuber-ears-backend",
      clientSchemaDirectives: ["client"],
      url: "http://localhost:4000/graphql",
      includes: ["./src/**/*.tsx"]
    }
  }
};
