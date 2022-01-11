module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nmd-nuber-eats-backend",
      url: "http://localhost:3333/graphql",
    },
  },
};
