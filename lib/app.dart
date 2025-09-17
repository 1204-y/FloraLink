import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import 'features/assistant/assistant_page.dart';
import 'features/communities/communities_page.dart';
import 'features/dashboard/dashboard_page.dart';
import 'features/encyclopedia/encyclopedia_page.dart';
import 'features/garden/garden_page.dart';
import 'features/observations/observations_page.dart';
import 'services/mock_repository.dart';
import 'theme/app_theme.dart';
import 'widgets/adaptive_navigation.dart';

final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>();
final GlobalKey<NavigatorState> _shellNavigatorKey = GlobalKey<NavigatorState>();

class FloraLinkApp extends StatefulWidget {
  const FloraLinkApp({super.key});

  @override
  State<FloraLinkApp> createState() => _FloraLinkAppState();
}

class _FloraLinkAppState extends State<FloraLinkApp> {
  late final MockRepository _repository;
  late final GoRouter _router;

  @override
  void initState() {
    super.initState();
    _repository = MockRepository();
    _router = _createRouter();
  }

  @override
  void dispose() {
    _repository.dispose();
    super.dispose();
  }

  GoRouter _createRouter() {
    final destinations = <NavigationItem>[
      const NavigationItem(icon: Icons.dashboard_rounded, label: '仪表盘', location: '/'),
      const NavigationItem(icon: Icons.local_florist_rounded, label: '我的花园', location: '/garden'),
      const NavigationItem(icon: Icons.map_rounded, label: '花期观测', location: '/observations'),
      const NavigationItem(icon: Icons.groups_rounded, label: '花友社区', location: '/communities'),
      const NavigationItem(icon: Icons.menu_book_rounded, label: '植物百科', location: '/encyclopedia'),
      const NavigationItem(icon: Icons.smart_toy_rounded, label: '智能助手', location: '/assistant'),
    ];

    return GoRouter(
      navigatorKey: _rootNavigatorKey,
      initialLocation: '/',
      debugLogDiagnostics: false,
      routes: <RouteBase>[
        StatefulShellRoute.indexedStack(
          parentNavigatorKey: _shellNavigatorKey,
          builder: (context, state, navigationShell) {
            return AdaptiveNavigationScaffold(
              navigationShell: navigationShell,
              destinations: destinations,
            );
          },
          branches: <StatefulShellBranch>[
            StatefulShellBranch(routes: <RouteBase>[
              GoRoute(
                path: '/',
                parentNavigatorKey: _shellNavigatorKey,
                pageBuilder: (context, state) => const NoTransitionPage(child: DashboardPage()),
              ),
            ]),
            StatefulShellBranch(routes: <RouteBase>[
              GoRoute(
                path: '/garden',
                parentNavigatorKey: _shellNavigatorKey,
                pageBuilder: (context, state) => const NoTransitionPage(child: GardenPage()),
              ),
            ]),
            StatefulShellBranch(routes: <RouteBase>[
              GoRoute(
                path: '/observations',
                parentNavigatorKey: _shellNavigatorKey,
                pageBuilder: (context, state) => const NoTransitionPage(child: ObservationsPage()),
              ),
            ]),
            StatefulShellBranch(routes: <RouteBase>[
              GoRoute(
                path: '/communities',
                parentNavigatorKey: _shellNavigatorKey,
                pageBuilder: (context, state) => const NoTransitionPage(child: CommunitiesPage()),
              ),
            ]),
            StatefulShellBranch(routes: <RouteBase>[
              GoRoute(
                path: '/encyclopedia',
                parentNavigatorKey: _shellNavigatorKey,
                pageBuilder: (context, state) => const NoTransitionPage(child: EncyclopediaPage()),
              ),
            ]),
            StatefulShellBranch(routes: <RouteBase>[
              GoRoute(
                path: '/assistant',
                parentNavigatorKey: _shellNavigatorKey,
                pageBuilder: (context, state) => const NoTransitionPage(child: AssistantPage()),
              ),
            ]),
          ],
        ),
      ],
      redirect: (context, state) {
        if (state.matchedLocation == '/') {
          return null;
        }
        return null;
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<MockRepository>.value(
      value: _repository,
      child: MaterialApp.router(
        title: '花集 FloraLink',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.light(),
        routerConfig: _router,
      ),
    );
  }
}
