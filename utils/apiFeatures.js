class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  // 1)
  filter() {
    // ADVANCE FILTER:
    const queryObj = { ...this.queryString };
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b (gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  // 2)
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
}

module.exports = APIFeatures;
