import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import { MOCK_ORDERS, formatCurrency } from '../../constants/mockData';
import Typography from '../../constants/typography';

const TABS = ['All', 'Pending', 'In Progress', 'Delivered', 'Cancelled'];
const STEPS = ['Placed', 'Confirmed', 'Dispatched', 'Delivered'];

const ProgressStepper = ({ progress, colors }) => (
  <View style={styles.stepper}>
    {STEPS.map((step, i) => (
      <React.Fragment key={step}>
        <View style={styles.stepItem}>
          <View style={[styles.stepDot, { backgroundColor: i < progress ? colors.accent : colors.border }]}>
            {i < progress && <MaterialCommunityIcons name="check" size={10} color="#FFF" />}
          </View>
          <Text style={[styles.stepLabel, { color: i < progress ? colors.accent : colors.textSecondary }]}>{step}</Text>
        </View>
        {i < STEPS.length - 1 && (
          <View style={[styles.stepLine, { backgroundColor: i < progress - 1 ? colors.accent : colors.border }]} />
        )}
      </React.Fragment>
    ))}
  </View>
);

const OrderCard = ({ order, colors }) => (
  <View style={[styles.orderCard, { backgroundColor: colors.card }]}>
    <View style={styles.orderTop}>
      <View style={styles.orderLeft}>
        <View style={[styles.orderIcon, { backgroundColor: colors.accentTint }]}>
          <MaterialCommunityIcons name={order.categoryIcon} size={24} color={colors.accent} />
        </View>
        <View>
          <Text style={[styles.orderName, { color: colors.textPrimary }]} numberOfLines={1}>{order.itemName}</Text>
          <Text style={[styles.orderMeta, { color: colors.textSecondary }]}>
            {order.quantity} {order.unit} × {formatCurrency(order.unitPrice)}
          </Text>
        </View>
      </View>
      <Text style={[styles.orderId, { color: colors.textSecondary }]}>{order.id}</Text>
    </View>

    <View style={styles.orderMid}>
      <Text style={[styles.orderTotal, { color: colors.accent }]}>Total: {formatCurrency(order.total)}</Text>
      <StatusBadge status={order.status} />
    </View>

    <View style={styles.supplierRow}>
      <View style={[styles.miniAvatar, { backgroundColor: colors.border }]}>
        <MaterialCommunityIcons name="account" size={14} color={colors.textSecondary} />
      </View>
      <Text style={[styles.supplierText, { color: colors.textSecondary }]}>{order.supplier.name}</Text>
    </View>

    {order.status !== 'Cancelled' && <ProgressStepper progress={order.progress} colors={colors} />}

    <View style={styles.actionRow}>
      {order.status === 'In Progress' && (
        <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.accent }]}>
          <Text style={[styles.actionText, { color: colors.accent }]}>Track</Text>
        </TouchableOpacity>
      )}
      {order.status === 'Pending' && (
        <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.error }]}>
          <Text style={[styles.actionText, { color: colors.error }]}>Cancel</Text>
        </TouchableOpacity>
      )}
      {order.status === 'Delivered' && (
        <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.accent }]}>
          <Text style={[styles.actionText, { color: colors.accent }]}>Reorder</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const OrderStatusScreen = ({ navigation }) => {
  const { colors } = useApp();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? MOCK_ORDERS
    : MOCK_ORDERS.filter((o) => o.status === activeTab);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Order Status</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <FlatList
        horizontal
        data={TABS}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setActiveTab(item)}
            style={[styles.tab, {
              backgroundColor: activeTab === item ? colors.accent : 'transparent',
              borderColor: activeTab === item ? colors.accent : colors.border,
            }]}
          >
            <Text style={{ color: activeTab === item ? '#FFF' : colors.textSecondary, fontSize: 13, fontWeight: '600' }}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {filtered.length === 0 ? (
        <EmptyState icon="package-variant" title="No orders" message="You don't have any orders in this category" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderCard order={item} colors={colors} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingBottom: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3,
  },
  backBtn: { padding: 8 },
  headerTitle: { ...Typography.cardTitle, fontSize: 18 },
  tabRow: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 50, borderWidth: 1, minWidth: 48, alignItems: 'center', justifyContent: 'center' },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  orderCard: {
    borderRadius: 16, padding: 16, marginBottom: 12,
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6,
  },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  orderLeft: { flexDirection: 'row', gap: 12, flex: 1, alignItems: 'center' },
  orderIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  orderName: { ...Typography.cardTitle, fontSize: 14, maxWidth: 180 },
  orderMeta: { ...Typography.caption, marginTop: 2 },
  orderId: { fontSize: 11, fontFamily: 'monospace' },
  orderMid: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  orderTotal: { ...Typography.cardTitle },
  supplierRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  miniAvatar: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  supplierText: { ...Typography.caption },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 4 },
  stepItem: { alignItems: 'center', gap: 4 },
  stepDot: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  stepLabel: { fontSize: 10, fontWeight: '500' },
  stepLine: { flex: 1, height: 2, marginHorizontal: 4, marginBottom: 16 },
  actionRow: { flexDirection: 'row', gap: 8, justifyContent: 'flex-end' },
  actionBtn: { borderWidth: 1.5, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 16 },
  actionText: { fontSize: 13, fontWeight: '600' },
});

export default OrderStatusScreen;
