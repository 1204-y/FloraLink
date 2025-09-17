import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../../models/models.dart';
import '../../services/mock_repository.dart';
import '../../widgets/info_chip.dart';
import '../../widgets/section_header.dart';

class ObservationsPage extends StatelessWidget {
  const ObservationsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final repository = context.watch<MockRepository>();
    final observations = repository.observations;

    return SafeArea(
      child: CustomScrollView(
        slivers: <Widget>[
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(24, 24, 24, 16),
            sliver: SliverList(
              delegate: SliverChildListDelegate(<Widget>[
                const SectionHeader(
                  title: '花期观测地图',
                  subtitle: '浏览各地花卉盛放信息，上传你的最新发现',
                ),
                const SizedBox(height: 20),
                _ObservationMap(observations: observations),
                const SizedBox(height: 24),
                const SectionHeader(title: '最新观测记录'),
                const SizedBox(height: 16),
                ...observations.map((observation) => _ObservationTile(observation: observation)),
              ]),
            ),
          ),
        ],
      ),
    );
  }
}

class _ObservationMap extends StatelessWidget {
  const _ObservationMap({required this.observations});

  final List<Observation> observations;

  @override
  Widget build(BuildContext context) {
    final markers = observations
        .map((observation) => Marker(
              point: LatLng(observation.latitude, observation.longitude),
              width: 80,
              height: 80,
              builder: (context) => _MapMarker(observation: observation),
            ))
        .toList();

    final initial = observations.isNotEmpty
        ? LatLng(observations.first.latitude, observations.first.longitude)
        : const LatLng(30.5728, 104.0668);

    return Container(
      height: 320,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        boxShadow: <BoxShadow>[
          BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 24, offset: const Offset(0, 12)),
        ],
      ),
      clipBehavior: Clip.hardEdge,
      child: FlutterMap(
        options: MapOptions(initialCenter: initial, initialZoom: 12),
        children: <Widget>[
          TileLayer(
            urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            userAgentPackageName: 'com.floralink.app',
          ),
          MarkerLayer(markers: markers),
        ],
      ),
    );
  }
}

class _MapMarker extends StatelessWidget {
  const _MapMarker({required this.observation});

  final Observation observation;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return GestureDetector(
      onTap: () {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('前往 ${observation.locationName ?? '观测点'} 的最新记录。')),
        );
      },
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(14),
              boxShadow: <BoxShadow>[
                BoxShadow(color: Colors.black.withOpacity(0.16), blurRadius: 18, offset: const Offset(0, 6)),
              ],
            ),
            child: Text(
              observation.title,
              style: textTheme.labelMedium?.copyWith(color: const Color(0xFF4F5B4A)),
            ),
          ),
          const SizedBox(height: 6),
          Container(
            width: 16,
            height: 16,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              gradient: LinearGradient(
                colors: <Color>[Color(0xFFE58C9B), Color(0xFF6FB597)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ObservationTile extends StatelessWidget {
  const _ObservationTile({required this.observation});

  final Observation observation;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final dateFormat = DateFormat('M月d日 HH:mm');
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        boxShadow: <BoxShadow>[
          BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 18, offset: const Offset(0, 10)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              InfoChip(
                label: observation.locationName ?? '未知地点',
                icon: Icons.location_on_rounded,
                color: const Color(0xFFE58C9B),
              ),
              const SizedBox(width: 12),
              Text(dateFormat.format(observation.observedAt),
                  style: textTheme.bodySmall?.copyWith(color: Colors.black45)),
            ],
          ),
          const SizedBox(height: 12),
          Text(observation.title, style: textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          Text(observation.description, style: textTheme.bodyMedium?.copyWith(color: Colors.black54)),
        ],
      ),
    );
  }
}
