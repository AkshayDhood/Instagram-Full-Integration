class Supplier {
	public static void  itemlist(Items a){
		a.actualcost();
		a.discount();
		a.price();
	}
	public static double banklist(Banks b,Items i)throws Exception {
		
		double x=(b.Details())-(i.price());
		return x;
	}
}