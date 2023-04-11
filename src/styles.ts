import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
  listSection: {
    width: '90%',
  },
  listSectionTitleText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  listItem: {
    margin: 10,
    width: '100%',
  },
  listItemTitleText: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
  },
  listItemDescriptionText: {
    fontSize: 12,
  },
  monitorContainer: {
    height: 30,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  monitorModalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f6fe',
  },
  monitorModalTitle: {
    fontWeight: 'bold',
    margin: 20,
  },
  monitor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#29ab50', // green
  },
  monitorUpdate: {
    backgroundColor: '#fce24c', // yellow
  },
  monitorCritical: {
    backgroundColor: '#db3421', // red
  },
  buttonStyle: {
    margin: 20,
  },
});
