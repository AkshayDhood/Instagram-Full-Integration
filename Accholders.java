interface Accholders {
	public String getName();
	public int getAccno();
	public double getBal();
	public String getAdrs();
}
class Akshaykukadkar implements Accholders {
	private String name="Akshay G Kukadkar";
	private int accno=131;
	private double bal=150000;
	private String adrs="Akola,Maharashtra";
	@Override
	public String getName() {
		return name;
	}
	@Override
	public int getAccno() {
		return accno;
	}
	@Override
	public double getBal() {
		return bal;
	}
	@Override
	public String getAdrs() {
		return adrs;
	}
}
class Manishchoudhary implements Accholders  {
	private String name="Manish Choudhary";
	private int accno=132;
	private double bal=100000;
	private String adrs="Durg,Chattisgadh";
	public String getName() {
		return name;
	}
	public int getAccno() {
		return accno;
	}
	public double getBal() {
		return bal;
	}
	public String getAdrs() {
		return adrs;
	}
}
class Pratiknimje implements Accholders {
	private String name="Pratik Nimje";
	private int accno=133;
	private double bal=180000;
	private String adrs="Nagpur,Maharashtra";
	public String getName() {
		return name;
	}
	public int getAccno() {
		return accno;
	}
	public double getBal() {
		return bal;
	}
	public String getAdrs() {
		return adrs;
	}
}
class Pankajzaa implements Accholders {
	private String name="Pankaj Zaa";
	private int accno=134;
	private double bal=130000;
	private String adrs="Yavatmal,Maharashtra";
	public String getName() {
		return name;
	}
	public int getAccno() {
		return accno;
	}
	public double getBal() {
		return bal;
	}
	public String getAdrs() {
		return adrs;
	}
}
class Animesh implements Accholders {
	private String name="Animesh";
	private int accno=135;
	private double bal=1020000;
	private String adrs="Chattisgadh";
	public String getName() {
		return name;
	}
	public int getAccno() {
		return accno;
	}
	public double getBal() {
		return bal;
	}
	public String getAdrs() {
		return adrs;
	}
}