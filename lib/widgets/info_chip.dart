import 'package:flutter/material.dart';

class InfoChip extends StatelessWidget {
  const InfoChip({
    super.key,
    required this.label,
    this.icon,
    this.color,
  });

  final String label;
  final IconData? icon;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final Color effectiveColor = color ?? Theme.of(context).colorScheme.primary.withOpacity(0.12);
    final TextStyle textStyle = Theme.of(context).textTheme.labelMedium ?? const TextStyle();
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: effectiveColor.withOpacity(0.18),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: effectiveColor.withOpacity(0.4)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          if (icon != null)
            Icon(icon, size: 16, color: effectiveColor.withOpacity(0.9)),
          if (icon != null) const SizedBox(width: 6),
          Text(label, style: textStyle.copyWith(color: effectiveColor.withOpacity(0.9))),
        ],
      ),
    );
  }
}
