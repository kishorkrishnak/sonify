import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:AppBar(
        title:const Text("Fooder",style: TextStyle(color: Colors.black,fontSize: 18,fontWeight: FontWeight.bold),),
        centerTitle: true,
      )
    );
  }
}
