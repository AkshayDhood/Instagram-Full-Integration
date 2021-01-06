import java.util.Scanner;
import java.lang.Class;

class Amazon {
	public static void main(String[] args)
	throws Exception{
		Scanner scn=new Scanner(System.in);
		System.out.println("Welcome to Amazon");
		System.out.println("items list \t price \n -------------------- \n Smartphone \t Rs.15000 \n Headphone \t Rs.2500 \n TV \t \t Rs.20000 \n Laptop \t Rs.50000");
		System.out.println("Item you want to buy");
		Class cls=Class.forName(scn.nextLine());
		Object obj=cls.newInstance();
		Items a=(Items)obj;
		Supplier.itemlist(a);
		System.out.println("Enter Payment Method \n ---------------- \n 1 - Debit Card \n 2 - Netbanking");
		if((scn.nextInt())==2){
			System.out.println("Tumri Fellow Netbanking not Available ");
			return;
		}
		else{
			System.out.println("Select Bank \n ------------------ \n SBI \n HDFC \n ICICI \n Axis");
			scn.nextLine();
			Class abc=Class.forName(scn.nextLine());
			Object abj=abc.newInstance();
			Banks b=(Banks)abj;
			Supplier.banklist(b,a);
			System.out.println("Your reamining Balance be "+Supplier.banklist(b,a));
			System.out.println("Item will be shipped \nThank U");
		}
	}
}

		