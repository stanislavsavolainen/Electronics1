//import java.sql.Connection;


import java.sql.*;
import java.util.Calendar;

public class Database1 {

	
	private static Connection dbConVarriable = null;
	private static String username = "root";
	private static String password = "123456";
	
	
	private static String url = "jdbc:mysql://127.0.0.1/electronics_db";
	
	
	public static void main( String [] args  ){
		
		
		try {
			
			
			Class.forName("com.mysql.jdbc.Driver");
			
			//make jdbc connection to database, mysql  database must have user with that name and password
			dbConVarriable = DriverManager.getConnection(url , username , password);

			System.out.println("Connection succeed !");
			
			//java.sql.Statement
			Statement mystatement = dbConVarriable.createStatement();
			
			String sqlQuery = "SELECT * FROM temperature1;";
			
			ResultSet myresult = mystatement.executeQuery(sqlQuery);
			
			//for - each database row
			while( myresult.next()) {
				
				int r_index = myresult.getInt("datasample_id");
				//int r_index  = 0;
				Timestamp r_date = myresult.getTimestamp("measure_timestamp");
				String s_date = r_date.toGMTString();
			
				
				String r_temperature = myresult.getString("temperature"); 
				
				System.out.println(" Data index : " + r_index + " date :" + s_date + " temperature :" + r_temperature);
			}
			
		} catch ( Exception e ) {
			System.out.println("Connection failed !");
		}
		
		
	}
	
	
}
