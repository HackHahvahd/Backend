// Import statements
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.FileWriter;
import java.io.PrintWriter;
import org.apache.pdfbox.cos.COSDocument;
import org.apache.pdfbox.pdfparser.PDFParser;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.PDFTextStripper;



public class ReadText {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		PDFTextStripper pdfStripper = null;
        PDDocument pdDoc = null;
        COSDocument cosDoc = null;
        File file = new File("C:\\Users\\Alan\\Documents\\CHENG_ALAN_RESUME.pdf");
        try {
            PDFParser parser = new PDFParser(new FileInputStream(file));
            parser.parse();
            cosDoc = parser.getDocument();
            pdfStripper = new PDFTextStripper();
            pdDoc = new PDDocument(cosDoc);
            
            String parsedText = pdfStripper.getText(pdDoc);
            System.out.println(parsedText);
            
            FileWriter  writer = new FileWriter("C:\\Users\\Alan\\Documents\\ResumeText.txt");
            PrintWriter outText = new PrintWriter(writer);
            outText.println(parsedText);
            outText.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            cosDoc.close();
        }
		
	}

}
