import 'package:flutter/material.dart';

class GradientCard extends StatelessWidget {
  const GradientCard({
    super.key,
    required this.gradient,
    required this.child,
    this.height,
    this.padding = const EdgeInsets.all(20),
  });

  final Gradient gradient;
  final Widget child;
  final double? height;
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      decoration: BoxDecoration(
        gradient: gradient,
        borderRadius: BorderRadius.circular(24),
        boxShadow: <BoxShadow>[
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 20,
            offset: const Offset(0, 12),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(24),
        child: Container(
          padding: padding,
          child: child,
        ),
      ),
    );
  }
}
