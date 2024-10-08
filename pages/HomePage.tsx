import React from 'react'
import { FlatList, Image, Text, View, ScrollView, Share } from 'react-native'
import { Card, FAB, Icon, Searchbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import UserAvatar from 'react-native-avatar-generator';
import data from '../data.json'

function HomePage({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <SafeAreaView style={{ marginTop: 8, backgroundColor: '#f6f9fe' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Searchbar
          style={{ backgroundColor: '#e2e9f1' }}
          icon="menu"
          mode="bar"
          placeholder="Search in emails"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onPress={() => navigation.navigate("Search")}
          traileringIcon={() => (
            <UserAvatar size={35} firstName='Hans' fontWeight="normal" />
          )}
          onIconPress={() => navigation.openDrawer()}
        />
        <Text style={{ marginTop: 16 }}>Inbox</Text>

        {/* Map through the emails array instead of using FlatList */}
        {data.emails.map((item) => (
          <Card key={item.id} elevation={0} style={{ marginTop: 16, marginStart: -16, marginRight: 4 }}>
            <Card.Title
              style={{ alignItems: 'baseline', marginTop: 8 }}
              title={item.sender.username}
              titleStyle={{ marginBottom: -8 }}
              subtitle={`${item.subject}\n${item.body}`}
              subtitleNumberOfLines={2}
              left={() => (
                <UserAvatar size={45} firstName={item.sender.username} fontWeight="normal" />
              )}
              leftStyle={{ marginRight: 20 }}
              right={() => (
                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'thin' }}>
                    {new Date(item.timestamp).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                    }).split(' ').reverse().join(' ')}
                  </Text>
                  <Icon source="star-outline" size={24} />
                </View>
              )}
            />
          </Card>
        ))}
      </ScrollView>
      <FAB
        icon="pencil-outline"
        label='Compose'
        style={{ backgroundColor: '#d4e5f5', position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        mode='elevated'
        size='medium'
      />
    </SafeAreaView >
  )
}

HomePage.sharedElements = () => {
  return ['searchbar'];
};
export default HomePage