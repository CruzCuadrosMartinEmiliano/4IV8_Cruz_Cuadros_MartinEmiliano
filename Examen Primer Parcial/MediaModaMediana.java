import java.util.Scanner;
public class MediaMedianaModa {
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        int can;
        int eleccion;
        System.out.println("Antes de Ingresar al programa deberia validar su edad");
        System.out.println("== Ingrese su Edad ==");
        
        int ed= sc.nextInt();
        
        if(ed>=18){
            
            System.out.println("==  Bienvenido Al programa ahora podras calcular la media la mediana y la moda de un conjunto de numeros  ==");
            do{
            System.out.println("Ingresa la cantidad de numeros que quieras Calcular ");
            can = sc.nextInt();
            int [] m= new int[can];
            System.out.println("Ingrese cada uno de los valores ");
            for(int i=0;i<can;i++){
            m[i]= sc.nextInt();
            
            }
            
            
            System.out.println("Perfecto ahora puede elegir que quiere hacer :)");
            System.out.println("1- Calcular la mediana");
            System.out.println("2- Calcular la moda");
            System.out.println("3- Calcular la media");
            System.out.println("4- Quiero regresar a ingresar los numeros");
             eleccion = sc.nextInt();
            
            switch(eleccion){
                case 1:
                        System.out.println("Calcular mediana ");
                            for (int i = 0; i < can - 1; i++) {
                        for (int j = 0; j < can - 1 - i; j++) {
                            if (m[j] > m[j + 1]) {
                                int temp = m[j];
                                m[j] = m[j + 1];
                                m[j + 1] = temp;
                            }
                        }
                    }
                    double mediana;
                    if (can % 2 == 0) {
                        mediana = (m[can/2 - 1] + m[can/2]) / 2.0;
                    } else {
                        mediana = m[can/2];
                    }
                    System.out.println("La mediana es: " + mediana);
                    break;
                        
                        
                    
                case 2:
                    System.out.println("Calcular moda");
                    int moda = m[0], maxCount = 0;
                    for (int i = 0; i < can; i++) {
                        int count = 0;
                        for (int j = 0; j < can; j++) {
                            if (m[j] == m[i]) count++;
                        }
                        if (count > maxCount) {
                            maxCount = count;
                            moda = m[i];
                        }
                    }
                    System.out.println("La moda es: " + moda);
                    break;
                case 3:
                    System.out.println("Calcular media");
                        int suma=0;
                    for(int i=0;i<can;i++){
                            suma+=m[i];
                   
                        }
                    double media =suma/can;
                    System.out.println("La media es: "+ media);
                    break;
                case 4:
                    System.out.println("Bye...");
                    
                default:  
                    System.out.println("No hay mas opciones ");
                    break;
            
            }
        }while(eleccion !=0 );
        
        }
       else{System.out.println("Lo siento tu no puedes estar aqui ");    }
        
    }
}