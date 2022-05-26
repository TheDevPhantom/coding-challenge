import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../middleware/async.js';
import User from '../models/User.js';
import { Parser } from 'json2csv';

// @desc      Get users
// @route     GET /api/v1/users
// @access    Public
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll(req.filters.config);
  res.status(200).json({
    success: true,
    count: users.length,
    pagination: req.filters.pagination,
    total: req.filters.total,
    data: users,
  });
});

// @desc      Get user
// @route     GET /api/v1/users/1
// @access    Public
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User with id of ${req.params.id} not found.`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Create user
// @route     POST /api/v1/users
// @access    Private
export const createUsers = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Edit user
// @route     PUT /api/v1/users/1
// @access    Private
export const editUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User with id of ${req.params.id} not found.`, 404)
    );
  }

  await user.update(req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Delete user
// @route     DELETE /api/v1/users/1
// @access    Private
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User with id of ${req.params.id} not found.`, 404)
    );
  }

  await user.destroy();

  res.status(200).json({
    success: true,
    userId: req.params.id,
  });
});

// @desc      Download CSV
// @route     GET /api/v1/users/csv
// @access    Private
export const downloadUsersCsv = asyncHandler(async (req, res, next) => {
  const users = await User.findAll(req.filters.config);
  console.log(users);
  const fields = [
    'id',
    'firstname',
    'lastname',
    'username',
    'email',
    'role',
    'active',
    'createdAt',
    'updatedAt',
  ];
  const opts = { fields };
  const parser = new Parser(opts);
  const csv = parser.parse(users);
  res.setHeader('Content-disposition', 'attachment; filename=data.csv');
  res.set('Content-Type', 'text/csv');
  res.status(200).send(csv);
});

// @desc      Get users report
// @route     GET /api/v1/users/report
// @access    Private
export const getUsersReport = asyncHandler(async (req, res, next) => {
  const activeUserCount = await User.count({
    ...req.filters.config,
    where: { ...req.filters.config.where, active: true },
  });
  const inactiveUserCount = await User.count({
    ...req.filters.config,
    where: { ...req.filters.config.where, active: false },
  });

  res.status(200).json({
    success: true,
    activeUserCount,
    inactiveUserCount,
  });
});
