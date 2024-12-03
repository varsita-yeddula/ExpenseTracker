package com.expense.tracker;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class AddIncomeServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Get income data from the form
        String incomeTitle = request.getParameter("income-title");
        double incomeAmount = Double.parseDouble(request.getParameter("income-amount"));
        String incomeDate = request.getParameter("income-date");

        // Database connection parameters
        String jdbcUrl = "jdbc:mysql://localhost:3306/expense_tracker";
        String dbUser = "root";
        String dbPassword = "";  // Replace with your MySQL password

        // JDBC connection and insert data into database
        try {
            // Load MySQL JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Connect to the database
            Connection connection = DriverManager.getConnection(jdbcUrl, dbUser, dbPassword);

            // Prepare SQL query to insert income data
            String sql = "INSERT INTO income (title, amount, date) VALUES (?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setString(1, incomeTitle);
            statement.setDouble(2, incomeAmount);
            statement.setString(3, incomeDate);

            // Execute the update (insert)
            statement.executeUpdate();

            // Close the resources
            statement.close();
            connection.close();

            // Optionally, redirect or send a success message
            response.sendRedirect("index.html");  // Redirecting to index.html after submitting income form.

        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().write("Error: " + e.getMessage());
        }
    }
}
