package com.urs.spellit.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/resources")
public class CommonController {

    @Value("${spring.servlet.multipart.location}") //
    private String uploadFilePath;


    /*public Resource showImage(@PathVariable String filename) throws
            MalformedURLException, FileNotFoundException {
        InputStream file = new FileInputStream(uploadFilePath + "/" + filename);
        return new UrlResource("file:" + file.getPath());
    }*/

    @GetMapping("/images")
    public ResponseEntity<byte[]> userSearch(@RequestParam("path") String path) throws IOException {
        if(path.equals(null)) {
            return null;
        }
        InputStream imageStream = new FileInputStream(uploadFilePath + "/" + path);
        byte[] imageByteArray = toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<byte[]>(imageByteArray, HttpStatus.OK);
    }

    public byte[] toByteArray(InputStream imageStream) {
        InputStream is = imageStream;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();

        int length;
        byte[] buffer = new byte[2048];
        try {
            while ((length = is.read(buffer, 0, buffer.length)) != -1) {
                bos.write(buffer, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        byte[] byteArray = bos.toByteArray();
        return byteArray;
    }
}
