import { Op } from 'sequelize';
import moment from 'moment';

const filteredResults = (model) => async (req, res, next) => {
  let config = {};
  const reqQuery = { ...req.query };
  const removeFields = ['select', 'sort', 'page', 'limit', 'where'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  if (req.query.select) {
    let select = req.query.select
      .split(',')
      .filter((item) => !item.includes('.'));

    config.attributes = select;
  }

  if (reqQuery.createdAt != null) {
    reqQuery.createdAt = {
      [Op.gte]: moment(reqQuery.createdAt).startOf('day'),
      [Op.lte]: moment(reqQuery.createdAt).endOf('day'),
    };
  }

  console.log(reqQuery.createdAt);

  config.where = {
    ...reqQuery,
  };

  if (req.query.sort) {
    const sortBy = req.query.sort;
    let fieldName;
    let order;
    if (sortBy[0] == '-') {
      fieldName = sortBy.substring(1);
      order = 'DESC';
    } else {
      fieldName = sortBy;
      order = 'ASC';
    }
    config.order = [[fieldName, order]];
  }

  // Limit Results
  if (req.query.limit) {
    config.limit = parseInt(req.query.limit);
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.count();

  config.limit = limit;
  config.offset = startIndex;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  req.filters = {
    pagination,
    config,
    total,
  };

  next();
};

export default filteredResults;
