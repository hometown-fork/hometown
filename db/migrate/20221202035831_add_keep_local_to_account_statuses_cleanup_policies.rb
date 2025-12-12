# frozen_string_literal: true

class AddKeepLocalToAccountStatusesCleanupPolicies < ActiveRecord::Migration[6.1]
  def change
    add_column :account_statuses_cleanup_policies, :keep_local, :boolean # rubocop:disable Rails/ThreeStateBooleanColumn
    change_column_default :account_statuses_cleanup_policies, :keep_local, false # rubocop:disable Rails/ReversibleMigration
  end
end
