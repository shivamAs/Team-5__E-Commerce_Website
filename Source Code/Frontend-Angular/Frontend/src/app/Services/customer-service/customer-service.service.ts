import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../Models/Item';
import { SubCategory } from '../../Models/subCategory';
import { Order } from '../../Models/Order';
import { CarryBox } from '../../Models/CarryBox';
import { Address } from '../../Models/Address';
import { Category } from '../../Models/Category';
import { User } from '../../Models/User';
import { BranchDto } from '../../Models/BranchDto';

@Injectable({
	providedIn: 'root'
})
export class CustomerServiceService {

	constructor(private http: HttpClient) { }


	/* Method:getABranchItems
	   * Type: GetMapping
	   * Description: Called from customer home page to view all the existing items in his location
	   * @param number: branchId
	   * @return Item[]: a List of all the existing items in the given branch
	   * @throws ResourceNotFoundException : It is raised when no data is found with the given request
	  */
	getABranchItems(branchId: number) {
		return this.http.get<Item[]>("http://localhost:8094/customer/getABranchItems/" + branchId);
	}



	/* Method:searchItems
	   * Type: GetMapping
	   * Description: Called from home page to search for desired items or categories
	   * @param number: branchId
	   * @param String: searchText
	   * @return Item[]: a set of items related to the search text is returned
	  */
	searchItems(branchId: number, searchText: string) {
		return this.http.get<Item[]>("http://localhost:8094/customer/searchItems/" + branchId + "/" + searchText);
	}



	/* Method:getABranchCategories
	   * Type: GetMapping
	   * Description: Called from customer home page to view all the existing categories of items in his location
	   * @param number: branchId
	   * @return Category[]: a List of all the existing categories of items in the given branch
	   * @throws ResourceNotFoundException : It is raised when no data is found with the given request
	  */
	getABranchCategories(branchId: number) {
		return this.http.get<SubCategory[]>("http://localhost:8094/customer/getABranchSubCategories/" + branchId);
	}



	/* Method: trackAnOrder
	   * Type: GetMapping
	   * Description: Called from customer account page to get the status of an order placed
	   * @param number: orderId
	   * @return Order[]: a list of Order object with that order Id from the user account
	   * @throws ResourceNotFoundException : It is raised when no data is found with the given request
	  */
	trackAnOrder(orderId: number) {
		return this.http.get<Order[]>("http://localhost:8094/customer/trackAnOrder/" + orderId);
	}



	/* Method:getACarryBoxDetails
	   * Type: GetMapping
	   * Description: Called from customer carry box page to get a list of items present in one's carrybox and related info
	   * @param number: carryBoxId
	   * @return CarryBox: a object of a CarryBox of given Carry Box id
	  */
	getCarryBoxDetails(emailId: string) {
		return this.http.get<CarryBox>("http://localhost:8094/customer/getACarryBoxDetails/" + emailId);
	}



	/* Method:getMyOrders
	   * Type: GetMapping
	   * Description: Called from customer account page to get a list of orders placed
	   * @param String: emailId
	   * @return Order[]: a list of Order objects placed from the user account
	   * @throws ResourceNotFoundException : It is raised when no data is found with the given request
	  */
	getMyOrders(emailId: string) {
		return this.http.get<Order[]>("http://localhost:8094/customer/getAnUserOrders/" + emailId);
	}



	/* Method:getMyAddresses
	   * Type: GetMapping
	   * Description: Called from customer account page and place order page to get a list of addresses saved
	   * @param String: emailId
	   * @return Address[]: a list of Address objects saved to a user account
	   * @throws ResourceNotFoundException : It is raised when no data is found with the given request	
	  */
	getMyAddresses(emailId: string) {
		return this.http.get<Address[]>("http://localhost:8094/customer/getAnUserAddresses/" + emailId);
	}



	/* Method:addAnItemToCarryBox
	   * Type: PostMapping
	   * Description: Called from items page to add a desired item to carry box before buying
	   * @param String:emailId
	   * @param number: itemId
	   * @return boolean: a boolean is returned to notify whether the item is added to carry box or not
	  */
	addItemToCarryBox(emailId: string, itemId: number) {
		return this.http.post<boolean>("http://localhost:8094/customer/addAnItemToCarryBox/" + emailId, itemId);
	}



	/* Method:addANewAddress
	   * Type: PostMapping
	   * Description: Called from customer account page and place order page to add a new address to the list of addresses saved
	   * @param Address: address 
	   * @return boolean: a boolean is returned to notify whether the new address is added or not
	   * @throws ResourceNotFoundException : It is raised when no data is found with the given request
	  */
	addANewAddress(emailId: string, address: Address) {
		return this.http.post<boolean>("http://localhost:8094/customer/addANewAddress/" + emailId, address);
	}

	/* Method:updateAnAddress
		* Type: PutMapping
		* Description: Called from customer account page to update an existing address in the list of addresses saved
		* @param Address: address 
		* @return boolean: a boolean is returned to notify whether the new address is updated or not
		* @throws ResourceNotFoundException : It is raised when no data is found with the given request
	   */
	updateAnAddress(emailId: string, address: Address) {
		return this.http.put<boolean>("http://localhost:8094/customer/updateAnAddress/" + emailId, address);
	}


	/* Method:placeOrder
	   * Type: PostMapping
	   * Description: Called from customer placeOrder page to place a new order
	   * @param String: emailId
	   * @param number:branchId
	   * @param number:addressId
	   * @return number: orderId is returned
	  */
	placeOrder(emailId: string, branchId: number, addressId: number) {
		return this.http.post<boolean>("http://localhost:8094/customer/placeANewOrder/" + emailId + "/" + branchId + "/" + addressId, "");
	}



	/* Method:updateItemInCarryBox
	   * Type: PutMapping
	   * Description: Called from Carry Box page to update the quantity of an item in carry box
	   * @param String:emailId
	   * @param number: itemId
	   * @param number: quantity
	   * @return boolean: a boolean is returned to notify whether an item in the carry box is updated or not
	  */
	updateItemInCarryBox(emailId: string, itemId: number, quantity: number) {
		return this.http.put<boolean>("http://localhost:8094/customer/updateACarryBoxItem/" + emailId + "/" + itemId, quantity);
	}



	/* Method:deleteACarryBoxItem
	   * Type: DeleteMapping
	   * Description: Called from Carry Box page to delete a item from carry box when not needed
	   * @param String:emailId
	   * @param number: itemId
	   * @return boolean: a boolean is returned to notify whether the item is deleted from carry box or not
	  */
	deleteACarryBoxItem(emailId: string, itemId: number) {
		return this.http.delete<boolean>("http://localhost:8094/customer/deleteACarryBoxItem/" + emailId + "/" + itemId);
	}


	/* Method:deleteAnAddress
		* Type: DeleteMapping
		* Description: Called from my aacount page to delete a saved address
		* @param number:addressId
		* @return boolean: a boolean is returned to notify whether the items are deleted from carry box or not
	   */
	deleteAnAddress(addressId: number) {
		return this.http.delete<boolean>("http://localhost:8094/customer/deleteAnAddress/" + addressId);
	}


	/* Method:clearCarryBox
	   * Type: DeleteMapping
	   * Description: Called from Carry Box page to delete all the items in carry box when not needed
	   * @param string:emailId
	   * @return boolean: a boolean is returned to notify whether the items are deleted from carry box or not
	  */
	clearTheCarryBox(emailId: string) {
		return this.http.delete<boolean>("http://localhost:8094/customer/clearACarryBox/" + emailId);
	}


	/* Method:getABranchCategoryList
	   * Type: GetMapping
	   * Description: Called from my account page, items page to get the list of categoreis in a branch
	   * @param number:branchId
	   * @return Category[]: a list of category objects will be returned
	*/
	getABranchCategoryList(branchId: number) {
		return this.http.get<Category[]>("http://localhost:8094/customer/getABranchCategories/" + branchId);
	}


	/* Method:getAnUserDetails
	   * Type: GetMapping
	   * Description: Called from my account page to get the details of an user
	   * @param string:emailId
	   * @return User: a user object will be retuned
	  */
	getAnUserDetails(emailId: string) {
		return this.http.get<User>("http://localhost:8094/customer/getAnUserDetails/" + emailId);
	}


	/* Method:getAllBranches
	   * Type: GetMapping
	   * Description: Called from home page to get the list of existing branches
	   * @return List<BranchDto>: a list of BranchDto objects will be retuned
	  */
	getAllBranches() {
		return this.http.get<BranchDto[]>("http://localhost:8094/customer/getAllBranches");
	}
}
