class ApiConfig {
  const ApiConfig({
    required this.baseUrl,
    this.apiKey,
  });

  final String baseUrl;
  final String? apiKey;

  ApiConfig copyWith({String? baseUrl, String? apiKey}) {
    return ApiConfig(
      baseUrl: baseUrl ?? this.baseUrl,
      apiKey: apiKey ?? this.apiKey,
    );
  }

  static const ApiConfig demo = ApiConfig(baseUrl: 'https://api.floralink.app');
}
