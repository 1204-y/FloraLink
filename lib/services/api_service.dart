import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/models.dart';
import 'api_config.dart';

class ApiService {
  ApiService({ApiConfig? config}) : _config = config ?? ApiConfig.demo;

  final ApiConfig _config;

  Future<List<Plant>> fetchGardenPlants() async {
    final uri = Uri.parse('${_config.baseUrl}/api/garden');
    final response = await http.get(uri, headers: _headers);
    if (response.statusCode != 200) {
      throw ApiException('加载我的花园失败: ${response.statusCode}');
    }
    final data = jsonDecode(response.body) as Map<String, dynamic>;
    final plants = data['plants'] as List<dynamic>? ?? <dynamic>[];
    return plants.map((dynamic item) => _plantFromJson(item as Map<String, dynamic>)).toList();
  }

  Future<List<Observation>> fetchObservations() async {
    final uri = Uri.parse('${_config.baseUrl}/api/observations');
    final response = await http.get(uri, headers: _headers);
    if (response.statusCode != 200) {
      throw ApiException('加载花期观测失败: ${response.statusCode}');
    }
    final list = jsonDecode(response.body) as List<dynamic>;
    return list.map((dynamic item) => _observationFromJson(item as Map<String, dynamic>)).toList();
  }

  Future<AssistantMessage> sendAssistantQuestion(String question) async {
    final uri = Uri.parse('${_config.baseUrl}/api/assistant');
    final response = await http.post(
      uri,
      headers: <String, String>{
        ..._headers,
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, dynamic>{'question': question}),
    );
    if (response.statusCode != 200) {
      throw ApiException('智能助手暂时无法响应: ${response.statusCode}');
    }
    final body = jsonDecode(response.body) as Map<String, dynamic>;
    return AssistantMessage(
      id: body['id']?.toString() ?? DateTime.now().millisecondsSinceEpoch.toString(),
      role: MessageRole.assistant,
      content: body['answer'] as String? ?? '',
      createdAt: DateTime.tryParse(body['created_at'] as String? ?? '') ?? DateTime.now(),
    );
  }

  Map<String, String> get _headers {
    if (_config.apiKey == null) {
      return <String, String>{};
    }
    return <String, String>{'Authorization': 'Bearer ${_config.apiKey}'};
  }

  Plant _plantFromJson(Map<String, dynamic> json) {
    return Plant(
      id: json['id'].toString(),
      name: json['name'] as String? ?? '未知植物',
      species: json['species'] as String? ?? '',
      location: json['location'] as String? ?? '未知位置',
      imageUrl: json['image_url'] as String? ?? '',
      healthStatus: _parseHealth(json['health_status'] as String?),
      lastWateredAt: DateTime.tryParse(json['last_watered_at'] as String? ?? '') ?? DateTime.now(),
      timeline: <GrowthRecord>[],
      tags: (json['tags'] as List<dynamic>? ?? <dynamic>[]).map((dynamic tag) => tag.toString()).toList(),
    );
  }

  PlantHealthStatus _parseHealth(String? value) {
    switch (value) {
      case 'attention':
        return PlantHealthStatus.attention;
      case 'warning':
        return PlantHealthStatus.warning;
      default:
        return PlantHealthStatus.healthy;
    }
  }

  Observation _observationFromJson(Map<String, dynamic> json) {
    return Observation(
      id: json['id'].toString(),
      title: json['title'] as String? ?? '未命名观测',
      description: json['description'] as String? ?? '',
      latitude: (json['latitude'] as num?)?.toDouble() ?? 0,
      longitude: (json['longitude'] as num?)?.toDouble() ?? 0,
      observedAt: DateTime.tryParse(json['observed_at'] as String? ?? '') ?? DateTime.now(),
      locationName: json['location_name'] as String?,
      imageUrl: json['image_url'] as String?,
    );
  }
}

class ApiException implements Exception {
  ApiException(this.message);

  final String message;

  @override
  String toString() => 'ApiException: $message';
}
