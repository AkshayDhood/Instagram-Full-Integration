interface Items {
	void actualcost();
	void discount();
	 double price();
}
class Smartphone implements Items {
	public void actualcost() {
		System.out.println("cost of a Smartphone is = Rs.15000 ");
		
	}
	public void discount() {
		System.out.println("Discount given is 10%");
	}
	public double price(){
		System.out.println("Price after discount is Rs.13500 ");
		return 13500;
	}
}
class Headphone implements Items {
	public void actualcost() {
		System.out.println("cost of a Headphone is = Rs.2500 ");
	}
	public void discount() {
		System.out.println("Discount given is 10%");
	}
	public double price(){
		System.out.println("Price after discount is Rs.2250 ");
		return 2250;
	}
}
class TV implements Items {
	public void actualcost() {
		System.out.println("cost of a TV is = Rs.20000 ");
	}
	public void discount() {
		System.out.println("Discount given is 10%");
	}
	public double price(){
		System.out.println("Price after discount is Rs.18000 ");
		return 18000;
	}
}
class Laptop implements Items {
	public void actualcost() {
		System.out.println("cost of a Laptop is = Rs.50000 ");
	}
	public void discount() {
		System.out.println("Discount given is 10%");
	}
	public double price(){
		System.out.println("Price after discount is Rs.45000 ");
		return 45000;
	}
}