import 'package:flutter/material.dart';

class GrowthRecord {
  const GrowthRecord({
    required this.date,
    required this.note,
    this.photoUrl,
  });

  final DateTime date;
  final String note;
  final String? photoUrl;
}

enum PlantHealthStatus { healthy, attention, warning }

extension PlantHealthStatusX on PlantHealthStatus {
  String get label {
    switch (this) {
      case PlantHealthStatus.healthy:
        return '状态良好';
      case PlantHealthStatus.attention:
        return '需要关注';
      case PlantHealthStatus.warning:
        return '紧急处理';
    }
  }

  Color get color {
    switch (this) {
      case PlantHealthStatus.healthy:
        return const Color(0xFF6FB597);
      case PlantHealthStatus.attention:
        return const Color(0xFFF2A365);
      case PlantHealthStatus.warning:
        return const Color(0xFFE85A4F);
    }
  }

  IconData get icon {
    switch (this) {
      case PlantHealthStatus.healthy:
        return Icons.check_circle_rounded;
      case PlantHealthStatus.attention:
        return Icons.error_outline_rounded;
      case PlantHealthStatus.warning:
        return Icons.warning_amber_rounded;
    }
  }
}

class Plant {
  const Plant({
    required this.id,
    required this.name,
    required this.species,
    required this.location,
    required this.imageUrl,
    required this.healthStatus,
    required this.lastWateredAt,
    required this.timeline,
    this.tags = const <String>[],
  });

  final String id;
  final String name;
  final String species;
  final String location;
  final String imageUrl;
  final PlantHealthStatus healthStatus;
  final DateTime lastWateredAt;
  final List<GrowthRecord> timeline;
  final List<String> tags;
}
