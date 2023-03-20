import { pool } from "../config/mySql-config.js";


export async function getEmployees() {
    const [rows] = await pool.query(`select * from popular_category`);
    console.log(rows);
    return rows;

}
export async function hireEmployee(empNO, birthDate, firstNmae, lastname, gender, hireDate) {
    const query = ` INSERT INTO employees VALUES(?,?,?,?,?,?)`;
    const [rows] = await pool.query(query, [
        empNO,
        birthDate,
        firstNmae,
        lastname,
        gender,
        hireDate
    ])
    return rows
}

export async function getMaxNo() {
    const [rows] = await pool.query('select max(emp_no) as max from employees');
    return rows[0];
}

export async function updateEmployee(empNo, lastName, gender) {
    const query = `UPDATE employees SET last_name=? , gender=? where emp_no=?`
    const [rows] = await pool.query(query, [
        lastName,
        gender,
        empNo,
    ])
    return rows;
}

export async function fireEmployee(empNo) {
    const query = `DELETE FROM employees where emp_no=${empNo}`
    const [rows] = await pool.query(query)
    return rows;
}
