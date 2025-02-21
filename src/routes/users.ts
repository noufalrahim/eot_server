import express from 'express';
import {
    delete_user,
    get_user_by_id,
    get_users,
    post_users,
    put_users
} from '../controllers/users.js';

const router = express.Router();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of users
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/users', get_users);


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved the user
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/users/:id', get_user_by_id);


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *               - username
 *               - departmentName
 *               - name
 *               - password
 *             properties:
 *               role:
 *                 type: string
 *                 enum: ["department", "anesthesia", "ot", "other"]
 *                 example: "department"
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               departmentName:
 *                 type: string
 *                 example: "IT"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */

router.post('/users', post_users);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *               - username
 *               - departmentName
 *               - name
 *               - password
 *             properties:
 *               role:
 *                 type: string
 *                 enum: ["department", "anesthesia", "ot", "other"]
 *                 example: "department"
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               departmentName:
 *                 type: string
 *                 example: "IT"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input or username already exists
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/users/:id', put_users);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/users/:id', delete_user);

export default router;
