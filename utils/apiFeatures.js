class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    filter() {
      //  BUILD QUERY
      // 1) FILTERING
      const queryObj = { ...this.queryStr };
      const excludedFields = ["page", "limit", "sort", "fields"];
      excludedFields.forEach((el) => delete queryObj[el]);
  
      //2) ADVANCE FILTERING
      let queryStr = JSON.stringify(queryObj);
      queryStr = JSON.parse(
        queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`)
      );
      // console.log(queryStr)
  
      // EXECUTE QUERY
      this.query = this.query.find(queryStr);
  
      return this;
    }
  
    sort() {
      // SORT QUERY
      if (this.queryStr.sort) {
        const sortBy = this.queryStr.sort.split(",").join(" ");
        console.log(sortBy);
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort("-createdAt");
      }
  
      return this;
    }
  
    limitFields() {
      // LIMITING FIELDS QUERY
      if (this.queryStr.fields) {
        const fields = this.queryStr.fields.split(",").join(" ");
        console.log(fields);
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select("-__v");
      }
      return this;
    }
  
    paginate() {
      // PAGINATION QUERY
      const page = this.queryStr.page * 1 || 1;
      const limit = this.queryStr.limit * 1 || 100;
  
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  }

  module.exports=ApiFeatures;