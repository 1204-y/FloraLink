import 'package:flutter/material.dart';

class AppTheme {
  static const Color bambooGreen = Color(0xFF6FB597);
  static const Color emeraldMist = Color(0xFFDBF1E1);
  static const Color blossomPink = Color(0xFFF7D9E1);
  static const Color duskRose = Color(0xFFE58C9B);
  static const Color inkGray = Color(0xFF2B2B2B);

  static ThemeData light() {
    final base = ThemeData.light(useMaterial3: true);
    return base.copyWith(
      colorScheme: base.colorScheme.copyWith(
        primary: bambooGreen,
        secondary: duskRose,
        surface: Colors.white,
        background: const Color(0xFFF6F7F4),
      ),
      scaffoldBackgroundColor: const Color(0xFFF6F7F4),
      textTheme: _buildTextTheme(base.textTheme),
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.white,
        elevation: 0,
        surfaceTintColor: Colors.white,
        foregroundColor: inkGray,
        titleTextStyle: _buildTextTheme(base.textTheme).titleLarge,
      ),
      cardTheme: CardTheme(
        color: Colors.white,
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        margin: const EdgeInsets.all(0),
      ),
      chipTheme: base.chipTheme.copyWith(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        labelStyle: _buildTextTheme(base.textTheme).labelMedium,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          elevation: 0,
          foregroundColor: Colors.white,
          backgroundColor: bambooGreen,
          textStyle: _buildTextTheme(base.textTheme).labelLarge,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
        ),
      ),
      useMaterial3: true,
    );
  }

  static TextTheme _buildTextTheme(TextTheme base) {
    const fontFamily = 'Inter';
    return base.copyWith(
      displayLarge: base.displayLarge?.copyWith(fontFamily: fontFamily, color: inkGray),
      displayMedium: base.displayMedium?.copyWith(fontFamily: fontFamily, color: inkGray),
      displaySmall: base.displaySmall?.copyWith(fontFamily: fontFamily, color: inkGray),
      headlineLarge: base.headlineLarge?.copyWith(fontFamily: fontFamily, color: inkGray),
      headlineMedium: base.headlineMedium?.copyWith(fontFamily: fontFamily, color: inkGray),
      headlineSmall: base.headlineSmall?.copyWith(fontFamily: fontFamily, color: inkGray),
      titleLarge: base.titleLarge?.copyWith(fontFamily: fontFamily, fontWeight: FontWeight.w600, color: inkGray),
      titleMedium: base.titleMedium?.copyWith(fontFamily: fontFamily, fontWeight: FontWeight.w600, color: inkGray),
      titleSmall: base.titleSmall?.copyWith(fontFamily: fontFamily, fontWeight: FontWeight.w600, color: inkGray),
      bodyLarge: base.bodyLarge?.copyWith(fontFamily: fontFamily, color: inkGray.withOpacity(0.85)),
      bodyMedium: base.bodyMedium?.copyWith(fontFamily: fontFamily, color: inkGray.withOpacity(0.85)),
      bodySmall: base.bodySmall?.copyWith(fontFamily: fontFamily, color: inkGray.withOpacity(0.7)),
      labelLarge: base.labelLarge?.copyWith(fontFamily: fontFamily, fontWeight: FontWeight.w600),
      labelMedium: base.labelMedium?.copyWith(fontFamily: fontFamily),
      labelSmall: base.labelSmall?.copyWith(fontFamily: fontFamily),
    );
  }
}
