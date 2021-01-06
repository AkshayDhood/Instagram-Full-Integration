import java.util.Scanner;
import java.lang.Class;

interface Banks {
 double Details()throws Exception ;
}
class SBI implements Banks {
	Scanner scn=new Scanner(System.in);
	public double Details() 
	throws Exception{
		System.out.println("Enter Name");
		Class cls=Class.forName(scn.next());
		Object obj=cls.newInstance();
		Accholders a=(Accholders)obj;
		System.out.println("Name = "+a.getName());
		System.out.println("Account No. = "+a.getAccno());
		System.out.println("Balance = "+a.getBal());
		System.out.println("Address = "+a.getAdrs());
	return a.getBal();
	}
}
class HDFC implements Banks {
	Scanner scn=new Scanner(System.in);
	public double Details() 
	throws Exception{
		System.out.println("Enter Name");
		Class cls=Class.forName(scn.next());
		Object obj=cls.newInstance();
		Accholders a=(Accholders)obj;
		System.out.println("Name = "+a.getName());
		System.out.println("Account No. = "+a.getAccno());
		System.out.println("Balance = "+a.getBal());
		System.out.println("Address = "+a.getAdrs());
		return a.getBal();
	}
}
class ICICI implements Banks {
	Scanner scn=new Scanner(System.in);
	public double Details() 
	throws Exception{
		System.out.println("Enter Name");
		Class cls=Class.forName(scn.next());
		Object obj=cls.newInstance();
		Accholders a=(Accholders)obj;
		System.out.println("Name = "+a.getName());
		System.out.println("Account No. = "+a.getAccno());
		System.out.println("Balance = "+a.getBal());
		System.out.println("Address = "+a.getAdrs());
		return a.getBal();
	}
}
class Axis implements Banks {
	Scanner scn=new Scanner(System.in);
	public double Details() 
	throws Exception{
		System.out.println("Enter Name");
		Class cls=Class.forName(scn.next());
		Object obj=cls.newInstance();
		Accholders a=(Accholders)obj;
		System.out.println("Name = "+a.getName());
		System.out.println("Account No. = "+a.getAccno());
		System.out.println("Balance = "+a.getBal());
		System.out.println("Address = "+a.getAdrs());
		return a.getBal();
	}
}