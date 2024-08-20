import 'package:flutter/material.dart';
import 'package:portfolio/widgets/ContactInfo.dart';

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Alameri Soft'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Circular Image
            CircleAvatar(
              radius: 75,
              backgroundImage: AssetImage('multimedia/images/PersonalImage.JPG'),
            ),
            SizedBox(height: 20), // Space between image and title
            // Title
            Text(
              'Alameri Phone',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10), // Space between title and description
            // Description
            Text(
              'Alameri Phone best software company in Yemen',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height:50), // Space before contact info
            // Phone Container
            ContactInfo(
              icon: Icons.phone,
              text: '+967 775200846',
            ),
            SizedBox(height: 10), // Space between phone and email
            // Email Container
            ContactInfo(
              icon: Icons.email,
              text: 'mo.na.ali.alamer@gmail.com',
            ),
            SizedBox(height: 100),
          ],
        ),
      ),
    );
  }
}